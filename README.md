## My Frida Workspace for Fun
Finally I have time to do some fun, this is my workspace to play or research (in fancy word)  Android App security.

The reason I create this repository is to store all of the resource files and also hopefully would be useful in any way for the community.

### Resources
I prefer to use these tools.

#### Magisk Modules
<table>
    <tr>
        <th>Usage</th>
        <th>Download</th>
    </tr>
    <tr>
        <td>AlwaysTrustUserCerts</td>
        <td><a href="https://github.com/NVISOsecurity/MagiskTrustUserCerts/releases">https://github.com/NVISOsecurity/MagiskTrustUserCerts/releases</a></td>
    </tr>
    <tr>
        <td>LPosed</td>
        <td><a href="https://github.com/LSPosed/LSPosed/releases">https://github.com/LSPosed/LSPosed/releases</a></td>
    </tr>
    <tr>
        <td>PlayIntegrityFix</td>
        <td><a href="https://github.com/chiteroman/PlayIntegrityFix/releases">https://github.com/chiteroman/PlayIntegrityFix/releases</a></td>
    </tr>
    <tr>
        <td>Shamiko</td>
        <td><a href="https://github.com/LSPosed/LSPosed.github.io/releases">https://github.com/LSPosed/LSPosed.github.io/releases</a></td>
    </tr>
</table>

#### Reverse Engineering
<table>
    <tr>
        <th>Usage</th>
        <th>Download</th>
    </tr>
    <tr>
        <td>Shared Object (.so) viewer (x86)</td>
        <td><a href="https://hex-rays.com/ida-free">https://hex-rays.com/ida-free</a></td>
    </tr>
    <tr>
        <td>Shared Object (.so) viewer (arm)</td>
        <td><a href="https://cutter.re">https://cutter.re</a></td>
    </tr>
    <tr>
        <td>Jar Viewer</td>
        <td><a href="http://java-decompiler.github.io">http://java-decompiler.github.io</a></td>
    </tr>
    <tr>
        <td>Apk Compile/Decompile</td>
        <td><a href="https://apktool.org">https://apktool.org</a></td>
    </tr>
    <tr>
        <td>Merge Split Apk</td>
        <td><a href="https://github.com/REAndroid/APKEditor">https://github.com/REAndroid/APKEditor</a></td>
    </tr>
</table>

#### Others
<table>
    <tr>
        <th>Usage</th>
        <th>Download</th>
    </tr>
    <tr>
        <td>Frida (Server)</td>
        <td><a href="https://github.com/frida/frida/releases">https://github.com/frida/frida/releases</a></td>
    </tr>
    <tr>
        <td>Termux</td>
        <td><a href="https://github.com/termux/termux-app/releases">https://github.com/termux/termux-app/releases</a></td>
    </tr>
    <tr>
        <td>Frida CodeShare</td>
        <td><a href="https://codeshare.frida.re/browse">https://codeshare.frida.re/browse</a></td>
    </tr>
</table>

### Workspace Structure
I know there is unnecessary bash script in this workspace, but I need to sharpen my bash skills as well.

    .
    ├── magisk-modules              # Android magisk modules
    │   └── ...
    ├── resources                   # Device tools and apps
    │   └── ...
    ├── scripts                     # Frida script I wrote
    │   ├── kiddies                 # Frida script from internet
    │   │   └── *.js
    │   └── *.js
    ├── tools                       # Tools and Utilities
    │   ├── JD-GUI.app
    │   ├── rootAVD
    │   ├── APKEditor-1.4.1.jar
    │   ├── frida-install.sh        # To install frida
    │   └── resource-downloader.sh  # Use this script to download resources and magisk modules
    └── README.md

### TODO (What will I try to learn?)
- [ ] Find how common root detection works then bypass
- [ ] Find how common emulator detection works then bypass
- [ ] Find how common frida detection works then bypass
- [ ] Find how GuardSquare emulator detection works
- [ ] Find how GuardSquare root detection works 
- [ ] I don't know yet but surely other android system like in-app-payment, 