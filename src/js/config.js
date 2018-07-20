export const host = 'http://localhost/api'
export const rsaPubKeyRelease = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCYBqJdy/aU5q1krBvRBDUn6WivukGiSBmlEqJbeDSTGDkyxIW6+adOHwKZhF+bDRFMPWZcqV0v2fgMbKKgoQIlCzDFGNa+4bTV5HsFq261kmwKVRZIYsSYks9P4yrkA4FwmnwR0Rc8blYOhxsqqekHcWZVHFrnLSavOiAQake2XQIDAQAB'
export const rsaPubKeyDev = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEo9qWXCI89ldwzLvTFNdbXAlIWHJmypkk+hxCZaKvtbIGvJTzDYjaRjrjGXYkpWd/AHZ9CPqFJxcNGq/rbCUDcptHLZsyjooYQ0m7TvRjRyMQHmBJWPZp7CrKqhsPwu4CU2fbbBTc99S7Uqdt5kOGl/KmeGT5tAUFzl1QQCionQIDAQAB'
// 需要登录的路由路径
export const isDev = process.env.NODE_ENV !== 'production'
export const rsaPubKey = isDev ? rsaPubKeyDev : rsaPubKeyRelease
export const needLogin = ['/bills']
export const enableLog = isDev
