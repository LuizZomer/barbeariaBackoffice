type IMessageType = "create" | "update" | "delete" 

export const messageGenerator = (msgType: IMessageType) => {
    switch(msgType){
        case "create":
            return {message: "Criado com sucesso!"}
        case "delete":
            return {message: "Apagado com sucesso!"}
        case 'update':
            return {message: "Atualizado com sucesso!"}
    }
}