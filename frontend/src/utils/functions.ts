import { toast } from "react-toastify"

interface IThenHandler {
    data: {
        message: string
    }
}

interface ICatchHandler {
    response?:{
        data: {
            message: string | string[]
        }
        statusCode: number;
    },
}


export const catchHandler = (err: ICatchHandler) => {
    if (err.response?.data) {
      if(Array.isArray(err.response.data.message)) toast.error(err.response.data.message[0]);
      if (err.response.data.message) toast.error(err.response.data.message);
      else toast.error(`Erro: ${err.response.statusCode}`);
  
      if (err.response.statusCode === 401 && window.location.pathname !== "/login")
        window.location.pathname = "/login";
    } else {
      toast.error("Erro de comunicação");
    }
  };
  
  export const thenHandler = (res: IThenHandler) => {
    if (res.data) {
      toast.success(res.data.message);
    } else {
      toast.success("Sucesso");
    }
  };

export const intlNumberFormatter = (number: number) => {
  return new Intl.NumberFormat('pt-br',{
    style: 'currency',
    currency: 'BRL'
  }).format(number)
}

export const valueMask = (value: string) => {
  const rawValue = value.replace(/\D/g, ""); 

  return (Number(rawValue) / 100)
  .toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, '') // Remove qualquer caractere que não seja número
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o primeiro ponto
    .replace(/(\d{3})(\d)/, '$1.$2') // Coloca o segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o traço
}

export const unmaskValue = (value: string): number => {
  // Remove o símbolo da moeda, espaços, e substitui a vírgula por ponto
  const rawValue = value
    .replace(/[^\d,]/g, '')  // Remove tudo que não for dígito ou vírgula
    .replace(/\.(?=.*\.)/, '') // Remove o primeiro ponto encontrado
    .replace(',', '.'); // Substitui a vírgula decimal por ponto

  return parseFloat(rawValue) || 0;
};

export const DateFormater = (date: string) => 
  new Date(date).toLocaleDateString()
  