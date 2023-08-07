function deeplyClone(value) {
    if (typeof value !== 'object') {
        return value
    } else {
        if (value === null) {
            return null
        }
        let result
        if (Array.isArray(value)) {
            result = []
            for (let i = value.length-1; i >= 0; i--) {
                result[i] = deeplyClone(value[i])
            }
        } else {
            result = {}
            for (const key in value) {
                result[key] = deeplyClone(value[key])
            }
        }
        return result
    }
}

export default deeplyClone