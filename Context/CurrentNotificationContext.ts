import { createContext } from "react";

export default createContext({currentNotification : {
    stepsToNavigate: '',
    latitude: 0,
    longitude: 0,
    fixitStatus: '',
    etaTime: null,
}, setCurrentNotification: (element: any) => {}});