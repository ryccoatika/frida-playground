Java.perform(() => {
    hook_build_properties()
    hook_android_id()
    hook_telephony_manager()
    hook_system_properties()
    hook_has_file()
})

const hook_build_properties = () => {
    // TODO: find great properties key value for bypass
    const properties = {
        "BOARD": "",
        "BOOTLOADER": "",
        "BRAND": "",
        "CPU_ABI": "",
        "CPU_ABI2": "",
        "DEVICE": "",
        "DISPLAY": "",
        "FINGERPRINT": "",
        "HARDWARE": "",
        "HOST": "",
        "ID": "",
        "MANUFACTURER": "",
        "MODEL": "",
        "ODM_SKU": "",
        "PRODUCT": "",
        "RADIO": "",
        "SERIAL": "",
        "SKU": "",
        "SOC_MANUFACTURER": "",
        "SOC_MODEL": "",
        "SUPPORTED_32_BIT_ABIS": "",
        "SUPPORTED_64_BIT_ABIS": "",
        "SUPPORTED_ABIS": "",
        "TAGS": "",
        "TIME": "",
        "TYPE": "",
        "USER": "",
    }
    const Build = Java.use("android.os.Build")

    for (let key in properties) {
        const value = properties[key]

        var field = Build.class.getDeclaredField(key)
        field.setAccessible(true)
        field.set(null, value)
    }
    console.log("[*] Build Properties hook loaded")

    // TODO: find great Partition value for bypass
    Build.getFingerprintedPartitions.overload().implementation = () => {
        console.log("[~] Build.getFingerprintedPartitions() called")

        var result = this.getFingerprintedPartitions()

        var partitionList = Java.cast(result, Java.use("java.util.List"))
        for (var i = 0; i < partitionList.size(); i++) {
            var partition = partitionList.get(i)
            console.log(`[~] Partition ${i}: ${partition.toString()}`)
        }

        return result
    }
    console.log("[*] Build getFingerprintedPartitions() hook loaded")

    // TODO: find great RadioVersion value for bypass
    Build.getRadioVersion.overload().implementation = () => {
        console.log("[~] Build.getRadioVersion() called")

        var result = this.getRadioVersion()

        console.log(`[~] RadioVersion: ${result}`)

        return result
    }
    console.log("[*] Build getRadioVersion() hook loaded")

    // TODO: find great Serial value for bypass
    Build.getSerial.overload().implementation = () => {
        console.log("[~] Build.getSerial() called")

        var result = this.getSerial()

        console.log(`[~] Serial: ${result}`)

        return result
    }
    console.log("[*] Build getSerial() hook loaded")
}

const hook_android_id = () => {
    // TODO: find great androidID value for bypass
    const androidID = ""
    const Secure = Java.use("android.provider.Settings.Secure")

    Secure.getString.overload("android.content.ContentResolver", "java.lang.String").implementation = (cr, key) => {
        console.log(`[~] Secure.getString(${cr.toString()}, ${key}) called`)

        if (key == "android_id") {
            const value = this.getString(cr, key)

            console.log(`[~] ${key}: ${value} (replaced with: ${androidID})`)

            return androidID
        } else {
            const value = this.getString(cr, key)

            console.log(`[~] ${key}: ${value}`)

            return value
        }
    }
    console.log("[*] Secure.getString() hook loaded")

}

const hook_telephony_manager = () => {
    const TelephonyManager = Java.use("android.telephony.TelephonyManager")

    // TODO: find great Line1Number value for bypass
    TelephonyManager.getLine1Number.overload().implementation = () => {
        console.log("[~] Build.getLine1Number() called")

        var result = this.getLine1Number()

        console.log(`[~] Line1Number: ${result}`)

        return result
    }
    console.log("[*] Build.getLine1Number() hook loaded")

    // TODO: find great DeviceId value for bypass
    TelephonyManager.getDeviceId.overload().implementation = () => {
        console.log("[~] Build.getDeviceId() called")

        var result = this.getDeviceId()

        console.log(`[~] DeviceId: ${result}`)

        return result
    }
    console.log("[*] Build.getDeviceId() hook loaded")

    // TODO: find great SubscriberId value for bypass
    TelephonyManager.getSubscriberId.overload().implementation = () => {
        console.log("[~] Build.getSubscriberId() called")

        var result = this.getSubscriberId()

        console.log(`[~] SubscriberId: ${result}`)

        return result
    }
    console.log("[*] Build.getSubscriberId() hook loaded")

    // TODO: find great NetworkOperatorName value for bypass
    TelephonyManager.getNetworkOperatorName.overload().implementation = () => {
        console.log("[~] Build.getNetworkOperatorName() called")

        var result = this.getNetworkOperatorName()

        console.log(`[~] NetworkOperatorName: ${result}`)

        return result
    }
    console.log("[*] Build.getNetworkOperatorName() hook loaded")

    // TODO: find great SimOperatorName value for bypass
    TelephonyManager.getSimOperatorName.overload().implementation = () => {
        console.log("[~] Build.getSimOperatorName() called")

        var result = this.getSimOperatorName()

        console.log(`[~] SimOperatorName: ${result}`)

        return result
    }
    console.log("[*] Build.getSimOperatorName() hook loaded")
}

const hook_system_properties = () => {
    // TODO: find known properties key value for bypass
    const properties = {
    }
    const SystemProperties = Java.use("android.os.SystemProperties")

    SystemProperties.get.overload("java.lang.String").implementation = (key) => {
        console.log(`[~] SystemProperties.get(${key}) called`)

        if (key in properties) {
            const alteredValue = properties[key]
            const originalValue = this.get(key)

            console.log(`[~] ${key}: ${originalValue} (replaced with: ${alteredValue})`)

            return key
        } else {
            const value = this.get(key)

            console.log(`[~] ${key}: ${alteredValue}`)

            return value
        }
    }
    console.log("[*] SystemProperties.get(String) hook loaded")
}

const hook_has_file = () => {
    // TODO: find known file list for bypass
    const bypassFiles = {

    }
    const File = Java.use("java.io.File")

    File.exists.overload().implementation = () => {
        console.log("[~] File.exists() called")

        const absolutePath = this.getAbsolutePath()
        console.log(`[~] AbsolutePath: ${absolutePath}`)

        if (absolutePath in bypassFiles) {
            const result = this.exists()
            console.log(`[~] Exists: ${result} (hooked to false)`)
            return false
        } else {
            const result = this.exists()
            console.log(`[~] Exists: ${result}`)
            return result
        }
    }
    console.log("[*] File.exists() hook loaded")
}