import { createContext } from "react";

export default createContext({feedback: {
    selectedFeedback: {},
    name: '',
    serviceType: '',
    amount: -1,


}, setSelectedFeedback: (element: any)=> {}});