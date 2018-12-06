export const hostDev = 'http://localhost:1310'
export const hostRelease = 'http://106.12.40.230:1011'
export const rsaPubKeyRelease = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYBqJdy/aU5q1krBvRBDUn6WivukGiSBmlEqJbeDSTGDkyxIW6+adOHwKZhF+bDRFMPWZcqV0v2fgMbKKgoQIlCzDFGNa+4bTV5HsFq261kmwKVRZIYsSYks9P4yrkA4FwmnwR0Rc8blYOhxsqqekHcWZVHFrnLSavOiAQake2XQIDAQAB'
// export const rsaPubKeyDev = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEo9qWXCI89ldwzLvTFNdbXAlIWHJmypkk+hxCZaKvtbIGvJTzDYjaRjrjGXYkpWd/AHZ9CPqFJxcNGq/rbCUDcptHLZsyjooYQ0m7TvRjRyMQHmBJWPZp7CrKqhsPwu4CU2fbbBTc99S7Uqdt5kOGl/KmeGT5tAUFzl1QQCionQIDAQAB'
export const rsaPubKeyDev = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCWP5quyXF73itsjeu2DBEam6jpb/r6sw2m8x6jKmz6I8wsytXAi9xVgrvj157RuSYWs4lN10XebuwWWT5JShYhJUib5kAdHokX6p2v7WE54mNo+l0KOdMHmhxp2G2W40NOkBkbNU20DUdL79FVTbUVYRx27s3FR3GEnLpQTA1H6QIDAQAB'

export const isDev = process.env.NODE_ENV !== 'production'
export const rsaPubKey = isDev ? rsaPubKeyDev : rsaPubKeyRelease
export const host = isDev ? hostDev : hostRelease
// 需要登录的路由路径
export const needLogin = ['/bills', '/assetList', '/asset/type']
export const enableLog = isDev
