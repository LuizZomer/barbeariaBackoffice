import { toast } from "react-toastify"

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


export const catchHandler = (err: ICatchHandler) => {
    toast.dismiss();
    if (err.response?.data) {
      if (err.response.data.message) toast.error(err.response.data.message);
      else toast.error(`Erro: ${err.response.status}`);
  
      if (err.response.status === 401 && window.location.pathname !== "/login")
        window.location.pathname = "/login";
    } else {
      toast.error("Erro de comunicação");
    }
  };
  
  export const thenHandler = (res: IThenHandler) => {
    toast.dismiss();
    if (res.data) {
      toast.success(res.data.message);
    } else {
      toast.success("Sucesso");
    }
  };
    