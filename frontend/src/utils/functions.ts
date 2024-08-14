import { Toast } from "@chakra-ui/react"

interface IThenHandler {
    data: {
        message: string
    }
}

interface ICatchHandler {
    response?:{
        data: {
            message: string
        }
        status: number;
    },
}


export const thenHandler = (res: IThenHandler) => {
    if(res.data) Toast({
        status: "success",
        title: res.data.message
    })

    Toast({
        status: 'success',
        title: "Sucesso"
    })
}

export const catchHandler = (err: ICatchHandler) => {
    if (err.response?.data) {
      if (err.response.data.message) Toast({
        status: 'error',
        title: err.response.data.message
    })
;
      else Toast({
        status: 'error',
        title: err.response.status
    })
  
      if (err.response.status === 401 && window.location.pathname !== "/login")
        window.location.pathname = "/login";
    } else {
      Toast({title: "Erro de comunicação", status: 'error'});
    }
  };
  
  