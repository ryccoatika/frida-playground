#!/bin/bash
version() {
    echo "$1" | awk -F. '{ printf("%03d%03d%03d", $1,$2,$3) }'
}

check_python_and_pip() {
    if command -v python > /dev/null 2>&1; then
        echo "[*] found python $(python --version)"
    else
        echo "[ ] need python"
        exit 1
    fi

    if command -v pip > /dev/null 2>&1; then
        echo "[*] found pip command"
    else
        echo "[ ] need pip"
        exit 1
    fi

    local python_version=`python --version | awk '{ print $2 }'`
    if [ $(version $python_version) -ge $(version "3.0") ]; then
        echo "[*] python and pip version are goods"
    else
        echo "[!] use python 3.0 or later more recommended"

        local choice="choice"
        while [[ $choice != "" ]] && [[ $choice != "a" ]] && [[ $choice != "c" ]]; do 
            read -p "Continue install frida [C]ontinue or [A]bort (Default [A])? " choice
            choice="$(echo $choice | awk '{ print tolower($1) }')"
        done

        if [[ $choice == "a" ]] || [[ $choice == "" ]]; then
            echo "[!] frida installation aborted"
            exit 0
        fi

        echo "[!] continue with old python and pip version"
    fi

}


if command -v frida > /dev/null 2>&1; then
    echo "[!] frida is already installed"
    exit 0
fi

check_python_and_pip

pip install frida frida-tools