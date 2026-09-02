#!/usr/bin/env bash
#
# apk-pull.sh — list installed apps via adb, pick one, pull all its APKs.
#
# Usage:
#   ./apk-pull.sh              # interactive picker (fzf if available, else numbered menu)
#   ./apk-pull.sh <keyword>    # pre-filter package list by keyword
#
set -euo pipefail

OUT_DIR="apk"
ADB="${ADB:-adb}"

die() { echo "error: $*" >&2; exit 1; }

command -v "$ADB" >/dev/null 2>&1 || die "adb not found in PATH"

# Ensure exactly one device/emulator is reachable.
devices=$("$ADB" devices | awk 'NR>1 && $2=="device" {print $1}')
[ -z "$devices" ] && die "no device connected (check: adb devices)"
if [ "$(echo "$devices" | wc -l)" -gt 1 ]; then
  die "multiple devices connected; set ANDROID_SERIAL to pick one:
$devices"
fi

echo "Fetching installed packages..." >&2
filter="${1:-}"
if [ -n "$filter" ]; then
  packages=$("$ADB" shell pm list packages | sed 's/^package://' | grep -i "$filter" | sort)
else
  packages=$("$ADB" shell pm list packages | sed 's/^package://' | sort)
fi
[ -z "$packages" ] && die "no packages matched"

# Select a package.
if command -v fzf >/dev/null 2>&1; then
  pkg=$(echo "$packages" | fzf --prompt="Select app > " --height=40% --reverse) || die "no selection"
else
  # Interactive search + numbered menu. Loop until a valid number is chosen.
  pkg=""
  while [ -z "$pkg" ]; do
    # Build filtered list from current search term (empty = all).
    list=()
    while IFS= read -r p; do
      [ -z "$p" ] && continue
      if [ -z "${search:-}" ]; then
        list+=("$p")
      else
        case "$p" in *"$search"*) list+=("$p");; esac
      fi
    done <<<"$packages"

    if [ "${#list[@]}" -eq 0 ]; then
      echo "No match for '${search}'. Try again." >&2
      search=""
      continue
    fi

    echo "" >&2
    [ -n "${search:-}" ] && echo "Filter: '$search' (${#list[@]} match)" >&2
    i=1
    for p in "${list[@]}"; do
      printf "%3d) %s\n" "$i" "$p" >&2
      i=$((i+1))
    done
    printf "Enter number to pull, or /term to search (/ alone = clear): " >&2
    read -r sel

    case "$sel" in
      /*)
        search="${sel#/}"   # strip leading slash; '/' alone clears filter
        continue
        ;;
      *)
        if [[ "$sel" =~ ^[0-9]+$ ]] && [ "$sel" -ge 1 ] && [ "$sel" -le "${#list[@]}" ]; then
          pkg="${list[$((sel-1))]}"
        else
          echo "Invalid selection." >&2
        fi
        ;;
    esac
  done
fi
[ -z "$pkg" ] && die "no package selected"

echo "Selected: $pkg" >&2

# Resolve APK paths on device (base + splits).
paths=$("$ADB" shell pm path "$pkg" | sed 's/^package://' | tr -d '\r')
[ -z "$paths" ] && die "no APK path for $pkg"

dest="$OUT_DIR/$pkg"
mkdir -p "$dest"

echo "Pulling $(echo "$paths" | wc -l | tr -d ' ') APK(s) into $dest/" >&2
while IFS= read -r remote; do
  [ -z "$remote" ] && continue
  name=$(basename "$remote")
  echo "  <- $remote" >&2
  "$ADB" pull "$remote" "$dest/$name" >/dev/null
done <<<"$paths"

echo "Done. APKs in: $dest/" >&2
ls -lh "$dest" >&2
