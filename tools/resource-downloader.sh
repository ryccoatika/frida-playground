#!/bin/bash

download_magisk_modules() {
    local magisk_modules_url=(
        "https://github.com/NVISOsecurity/MagiskTrustUserCerts/releases/download/v0.4.1/AlwaysTrustUserCerts.zip"
        "https://github.com/LSPosed/LSPosed/releases/download/v1.9.2/LSPosed-v1.9.2-7024-zygisk-release.zip"
        "https://github.com/chiteroman/PlayIntegrityFix/releases/download/v17.9/PlayIntegrityFix_v17.9.zip"
        "https://github.com/LSPosed/LSPosed.github.io/releases/download/shamiko-357/Shamiko-v1.1.1-357-release.zip"
    )
    local magisk_module_dir="magisk-modules"

    check_directory $magisk_module_dir
    download_batch "${magisk_modules_url[@]}" $magisk_module_dir
}

download_resources() {
    local resources_url=(
        "https://github.com/frida/frida/releases/download/16.5.6/frida-server-16.5.6-android-arm64.xz"
        "https://github.com/termux/termux-app/releases/download/v0.118.1/termux-app_v0.118.1+github-debug_arm64-v8a.apk"
    )
    local resource_module_dir="resources"

    check_directory $resource_module_dir
    download_batch "${resources_url[@]}" $resource_module_dir
}

download_batch() {
    urls=("${@:1:$#-1}")
    out_dir="${!#}"

    for url in "${urls[@]}"; do
        wget "$url" -P "$out_dir" -q --show-progress
    done
}

remove_files_directory() {
    echo ""
}

check_directory() {
    if [[ -d $1 ]] && [[ ! -z "$(ls -A $1)" ]]; then
        local choice="choice"
        while [[ $choice != "" ]] && [[ $choice != "y" ]] && [[ $choice != "n" ]]; do
            read -p "$1 already exist, do you want to remove all (Y/n)? " choice
            choice="$(echo $choice | awk '{ print tolower($1) }')"
        done

        if [[ $choice == "y" ]]; then
            rm -Rf $1
        else
            echo "download aborted"
            exit 1
        fi
    fi

    if [[ ! -d $1 ]]; then
        mkdir $1
        echo "$1 directory created"
    fi
}

current_command_filename="$(echo $0 | awk -F/ '{ print $NF }')"

if [[ ! -f "./tools/$current_command_filename" ]]; then
    echo "run the command from project root directory"
    exit 1
fi

download_magisk_modules
download_resources