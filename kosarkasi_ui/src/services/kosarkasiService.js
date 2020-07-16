


export const kosarkasiService = {
    ucitavanje
};



export function ucitavanje(){
    const requestOptions = {
        method: "GET"
      };
    
      return fetch(`api/kosarkasi`, requestOptions);
      
};