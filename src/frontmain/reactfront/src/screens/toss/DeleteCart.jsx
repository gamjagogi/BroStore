import axios from "../Request/RequestConfig";


const DeleteCart = async () => {

    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const id = sessionStorage.getItem("userData2");

        if (accessToken && refreshToken) {
            const response = await axios.get(`/auth/cart/delete/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                    'RefreshToken': `Bearer ${refreshToken}`,
                },
            });

            if (response.status == 200) {
                console.log('결제 성공, 장바구니 삭제')
                console.log(response.data);
            }
        } else {
            console.error('인증되지 않은 사용자가 접근하려 합니다.');
            throw new Error('인증되지 않은 사용자가 접근하려 합니다.');
        }
    } catch (error) {
        console.error('에러발생..', error);
        alert('결제 실패 및 에러발생, 잠시 후 다시 진행해 주세요.');
    }
}

export default DeleteCart;