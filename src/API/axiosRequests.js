import axios from "axios";

const registerNewUser = async (user) => {
    const options = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user["stsTokenManager"]["accessToken"]
        }
    }
    await axios.post('http://127.0.0.1:5000/registerNewUser', {
        'user_id': user["uid"],
        'email': user["email"],
    }, options).then((response) => {
        console.log(JSON.stringify(response["data"]));
    }, (error) => {
        console.log(error);
    });
}


export default registerNewUser;