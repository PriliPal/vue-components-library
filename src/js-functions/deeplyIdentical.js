function deeplyIdentical(arg1, arg2) {
    if (!(typeof arg1 === "object" && typeof arg2 === "object")) {
        return arg1 === arg2;
    } else {
        if (arg1 === null && arg2 === null) {
            return true
        }
        if ((arg1 === null && arg2 !== null) || (arg1 !== null && arg2 === null)) {
            return false
        }
        if (arg1.length === 0 && arg2.length === 0) {
            return true
        }
        if (arg1.length !== arg2.length) {
            return false
        }
        if (Array.isArray(arg1) && Array.isArray(arg2)) {
            for (let i = arg1.length-1; i >= 0; i--) {
                if (typeof arg1[i] === typeof arg2[i]) {
                    if (typeof arg1[i] === "object") {
                        if (!deeplyIdentical(arg1[i], arg2[i])) {
                            return false
                        }
                    } else if (arg1[i] !== arg2[i]) {
                        return false
                    }
                } else {
                    return false
                }
            }
        } else if (!Array.isArray(arg1) && !Array.isArray(arg2)) {
            for (let key in arg1) {
                if (typeof arg1[key] === typeof arg2[key]) {
                    if (typeof arg1[key] === "object") {
                        if (!deeplyIdentical(arg1[key], arg2[key])) {
                            return false
                        }
                    } else if (arg1[key] !== arg2[key]) {
                        return false
                    }
                } else {
                    return false
                }
            }
        } else {
            return false
        }
        return true
    }
}

export default  deeplyIdentical