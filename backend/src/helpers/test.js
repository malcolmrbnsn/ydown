const yt = require("./youtube")

async function test() {
    a = await yt.getVideo("9xncum0d4Vk")
    console.log(a)
}