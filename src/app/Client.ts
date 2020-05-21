
export class Client{

    private clientName:string;
    private clientEmail:string;
    private clientMessage:string;


    constructor(name:string,email:string,msg:string) {
        this.clientName = name;
        this.clientEmail = email;
        this.clientMessage = msg;
    }

    public getName(){
        return this.clientName;
    }
    public getEmail(){
        return this.clientEmail;
    }
    public getMessage(){
        return this.clientMessage;
    }
        
    
}

