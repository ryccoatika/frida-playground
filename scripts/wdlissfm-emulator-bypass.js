Java.perform(() => {
    console.log("")

    hook_build_properties()
    hook_android_id()
    hook_telephony_manager()
    hook_system_properties()
    hook_has_file()
})

const hook_build_properties = () => {
    const properties = {
        "BOARD": "a15",
        "BOOTLOADER": "A155FXXS1AXA4",
        "BRAND": "samsung",
        "CPU_ABI": "arm64-v8a",
        "CPU_ABI2": "",
        "DEVICE": "a15",
        "DISPLAY": "UP1A.231005.007.A155FXXS1AXA4",
        "FINGERPRINT": "samsung/a15nsxx/a15:14/UP1A.231005.007/A155FXXS1AXA4:user/release-keys",
        "HARDWARE": "mt6789",
        "HOST": "21DKGB17",
        "ID": "UP1A.231005.007",
        "MANUFACTURER": "samsung",
        "MODEL": "SM-A155F",
        "ODM_SKU": "hcesim",
        "PRODUCT": "a15nsxx",
        "RADIO": "unknown",
        "SERIAL": "unknown",
        "SKU": "hcesim",
        "SOC_MANUFACTURER": "Mediatek",
        "SOC_MODEL": "MT6789V/CD",
        "TAGS": "release-keys",
        "TYPE": "user",
        "USER": "dpi",
    }
    const Build = Java.use("android.os.Build")

    for (let key in properties) {
        var field = Build.class.getDeclaredField(key)
        field.setAccessible(true)

        const mockedValue = properties[key]
        field.set(null, mockedValue)

        console.log(`[~] Hooked Build.${key} => ${mockedValue}`)
    }

    Build.TIME.value = 1706055275000
    console.log(`[~] Hooked Build.TIME => ${Build.TIME.value}`)

    Build.SUPPORTED_ABIS.value = Java.array("java.lang.String", ["arm64-v8a", "armeabi-v7a", "armeabi"])
    console.log(`[~] Hooked Build.SUPPORTED_ABIS => ${Build.SUPPORTED_ABIS.value}`)

    Build.SUPPORTED_32_BIT_ABIS.value = Java.array("java.lang.String", ["armeabi-v7a", "armeabi"])
    console.log(`[~] Hooked Build.SUPPORTED_32_BIT_ABIS => ${Build.SUPPORTED_32_BIT_ABIS.value}`)

    Build.SUPPORTED_64_BIT_ABIS.value = Java.array("java.lang.String", ["arm64-v8a"])
    console.log(`[~] Hooked Build.SUPPORTED_64_BIT_ABIS => ${Build.SUPPORTED_64_BIT_ABIS.value}`)

    Build.getFingerprintedPartitions.overload().implementation = function () {
        const mockedPartitions = Java.use("java.util.ArrayList").$new()

        function createPartition(fingerprint, name, timeMs) {
            const partition = Java.use("android.os.Build$Partition")
            return partition.$new(
                fingerprint,
                name,
                timeMs
            )
        }

        mockedPartitions.add(createPartition("samsung/a15nsxx/a15:12/SP1A.210812.016/A155FXXS1AXA4:user/release-keys", "bootimage", 1706056043000))
        mockedPartitions.add(createPartition("samsung/a15nsxx/a15:12/SP1A.210812.016/A155FXXS1AXA4:user/release-keys", "odm", 1706056043000))
        mockedPartitions.add(createPartition("samsung/a15nsxx/a15:14/UP1A.231005.007/A155FXXS1AXA4:user/release-keys", "product", 1706055275000))
        mockedPartitions.add(createPartition("samsung/a15nsxx/a15:14/UP1A.231005.007/A155FXXS1AXA4:user/release-keys", "system_ext", 1706055275000))
        mockedPartitions.add(createPartition("samsung/a15nsxx/a15:14/UP1A.231005.007/A155FXXS1AXA4:user/release-keys", "system", 1706055275000))
        mockedPartitions.add(createPartition("samsung/a15nsxx/a15:12/SP1A.210812.016/A155FXXS1AXA4:user/release-keys", "vendor", 1706056043000))

        console.log(`[~] Hooked Build.getFingerprintedPartitions() => ${mockedPartitions.toString}`);

        return mockedPartitions;
    }
    console.log("[*] Loaded Hook Build.getFingerprintedPartitions()")

    Build.getRadioVersion.overload().implementation = function () {
        console.log(" Build.getRadioVersion() called")

        const mockedValue = "A155FXXU1AWKA,A155FXXU1AWKA"

        console.log(`[~] Hooked Build.getRadioVersion() => ${mockedValue}`)

        return mockedValue
    }
    console.log("[*] Loaded Hook Build.getRadioVersion()")
}

const hook_android_id = () => {
    const Secure = Java.use("android.provider.Settings$Secure")

    Secure.getString.overload("android.content.ContentResolver", "java.lang.String").implementation = function (cr, key) {
        if (key == "android_id") {
            const mockedValue = "0fc98b5e7e1465e3"

            console.log(`[~] Hooked Secure.getString(${cr.toString()}, ${key}) => ${mockedValue}`)

            return mockedValue
        }
        return this.getString(cr, key)
    }
    console.log("[*] Loaded Hook Secure.getString()")

}

const hook_telephony_manager = () => {
    const TelephonyManager = Java.use("android.telephony.TelephonyManager")

    TelephonyManager.getLine1Number.overload().implementation = function () {
        const mockedValue = "+6285156574223"

        console.log(`[~] Hooked TelephonyManager.getLine1Number() => ${mockedValue}`)

        return mockedValue
    }
    console.log("[*] Loaded Hook TelephonyManager.getLine1Number()")

    TelephonyManager.getNetworkOperatorName.overload().implementation = function () {
        const mockedValue = "by.U"

        console.log(`[~] Hooked TelephonyManager.getNetworkOperatorName() => ${mockedValue}`)

        return mockedValue
    }
    console.log("[*] Loaded Hook TelephonyManager.getNetworkOperatorName()")

    TelephonyManager.getSimOperatorName.overload().implementation = function () {
        const mockedValue = "Telkomsel"

        console.log(`[~] TelephonyManager.getSimOperatorName() => ${mockedValue}`)

        return mockedValue
    }
    console.log("[*] Loaded Hook TelephonyManager.getSimOperatorName()")
}

const hook_system_properties = () => {
    const SystemProperties = Java.use("android.os.SystemProperties")

    SystemProperties.get.overload("java.lang.String").implementation = function (key) {
        const mockedValue = props[key] ?? ""

        console.log(`[~] Hooked SystemProperties.get(${key}) => ${mockedValue}`)

        return mockedValue
    }
    console.log("[*] Loaded Hook SystemProperties.get(String)")
}

const hook_has_file = () => {
    const bypassFiles = [
        "/dev/socket/genyd",
        "/dev/socket/baseband_genyd",
        "/dev/socket/qemud",
        "/dev/qemu_pipe",
        "/dev/qemu_trace",
        "/dev/goldfish_address_space",
        "/dev/goldfish_pipe",
        "/dev/goldfish_sync",
        "/ueventd.android_x86.rc",
        "/x86.prop",
        "/ueventd.ttVM_x86.rc",
        "/init.ttVM_x86.rc",
        "/fstab.ttVM_x86",
        "/fstab.vbox86",
        "/init.vbox86.rc",
        "/ueventd.vbox86.rc",
        "/fstab.andy",
        "/ueventd.andy.rc",
        "/fstab.nox",
        "/init.nox.rc",
        "/ueventd.nox.rc",
        "/system/bin/nox-prop",
        "/system/bin/nox-vbox-sf",
        "/system/bin/noxd",
        "/system/bin/qemu-props",
        "/system/lib/libc_malloc_debug_qemu.so",
        "/sys/qemu_trace",
        "/sys/goldfish_address_space",
        "/sys/goldfish_battery",
        "/sys/goldfish_pipe",
        "/sys/goldfish_sync",
        "/sys/kvm",
    ]

    const keywords = [
        "nox",
        "bluestacks",
        "geny",
        "andy",
        "vbox",
        "goldfish",
        "qemu"
    ]

    const File = Java.use("java.io.File")

    File.exists.overload().implementation = function () {
        const absolutePath = this.getAbsolutePath()

        if (bypassFiles.includes(absolutePath)) {
            console.log(`[~] Hooked File(${absolutePath}).exists() => false`)
            return false
        } else {
            for (let i = 0; i < keywords.length; i++) {
                const keyword = keywords[i];

                if (absolutePath.includes(keyword)) {
                    console.log(`[~] Hooked File(${absolutePath}).exists() => false`)
                    return false
                }
            }

            return this.exists()
        }
    }
    console.log("[*] Loaded Hook File.exists()")
}