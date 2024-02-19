
 export const getCurrentPosition = async () => {
    try {
      const position: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

     return position.coords;
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };