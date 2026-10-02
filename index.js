const axios = require("axios");

const CAPTCHA = "cfbc9ca5ce86fecedcd3a6198e3cbdfd";

async function checkPincode(pincode) {
    try {
        const response = await axios.post(
            "https://franchexpress.com/proxy1.php",
            {
                keyword: pincode,
                captcha: CAPTCHA
            },
            {
                headers: {
                    Accept: "application/json, text/javascript, */*; q=0.01",
                    "Content-Type": "application/json",
                    Origin: "https://franchexpress.com",
                    Referer: "https://franchexpress.com/pincode-finder/",
                    "X-Requested-With": "XMLHttpRequest"
                }
            }
        );

        return response.data;

    } catch (error) {
        console.error(`Error checking ${pincode}`);

        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response:", error.response.data);
        } else {
            console.error(error.message);
        }

        return null;
    }
}

async function main() {
    const pincodes = [
        "532001",
        "380001",
        "110001",
        "999999"
    ];

    for (const pincode of pincodes) {
        console.log(`\nChecking ${pincode}...`);

        const result = await checkPincode(pincode);

        if (!result) {
            continue;
        }

        if (result.status === "success" && result.data?.length > 0) {
            console.log("✅ SERVICEABLE");
            console.log("Results:", result.data.length);
            console.log("Hub:", result.data[0].hub_name);
            console.log("District:", result.data[0].district_name);
        } else {
            console.log("❌ NOT SERVICEABLE");
        }
    }
}

main();