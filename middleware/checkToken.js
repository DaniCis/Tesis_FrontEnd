import { getDecoded } from '~/utils/auth';
export default function(){
    var decodedToken = getDecoded()
    var date = new Date( decodedToken.exp *1000)
    setTimeout(()=>{
        this.showModalToken()
    }, date - Date.now());
        
};

