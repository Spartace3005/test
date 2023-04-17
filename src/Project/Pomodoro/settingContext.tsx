import React from "react";
import { useState, createContext } from "react";

interface SettingContextProps {
breakTime: number;
studyTime: number;
longBreak:number;
secondLeft: number;
running: boolean;
timeLable: string;
loopCount:number;
open:boolean;
setOpen: React.Dispatch<React.SetStateAction<boolean>>;
setBreakTime: React.Dispatch<React.SetStateAction<number>>;
setStudyTime: React.Dispatch<React.SetStateAction<number>>;
setLongBreak: React.Dispatch<React.SetStateAction<number>>;
setTimeLable: React.Dispatch<React.SetStateAction<string>>;
setSecondLeft: React.Dispatch<React.SetStateAction<number>>;
setRunning: React.Dispatch<React.SetStateAction<boolean>>;
setLoopCount:React.Dispatch<React.SetStateAction<number>>;
startPauseCount: () => void;
stopCount: () => void;
skip: () => void;
handleOpen: () => void;
handleClose: () => void;
}

const SettingContext = createContext<SettingContextProps>({
breakTime: 0,
studyTime: 0,
longBreak:0,
secondLeft: 0,
running: false,
timeLable: "Study",
loopCount: 0,
open:false,
setOpen: () => {},
setBreakTime: () => {},
setStudyTime: () => {},
setLongBreak: () => {},
setTimeLable: () => {},
setSecondLeft: () => {},
setRunning: () => {},
startPauseCount: () => {},
stopCount: () => {},
skip: () => {},
setLoopCount: () =>{},
handleClose: () =>{},
handleOpen: () =>{},
});

const SettingProvider: React.FC = ({children}: React.PropsWithChildren<{}>) => {
const [breakTime, setBreakTime] = useState<number>(0);
const [studyTime, setStudyTime] = useState<number>(0);
const [secondLeft, setSecondLeft] = useState<number>(studyTime * 60);
const [running, setRunning] = useState<boolean>(false);
const [timeLable, setTimeLable] = useState<string>("Study");
const [loopCount, setLoopCount] = useState<number>(0);
const [longBreak,setLongBreak] = useState<number>(0);
const [open, setOpen] = useState<boolean>(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);



const startPauseCount = () => {
setRunning(!running);
};

const stopCount = () => {
setRunning(false);
setSecondLeft(studyTime * 60);
setTimeLable("Study");
};

const skip =() => {

    if(timeLable === "Break"){
        setSecondLeft(studyTime*60)
        setTimeLable("Study");
        if (typeof loopCount === 'number' && loopCount > 1) {
            setLoopCount(loopCount - 1);
          }
        if(loopCount === 1){
            setSecondLeft(longBreak * 60)
            setTimeLable('Long Break');
        }
    }else if (timeLable === "Study"){
        setSecondLeft(breakTime*60)
        setTimeLable("Break");
    }
    else if(timeLable === "Long Break"){
        setSecondLeft(studyTime*60)
        setTimeLable("Study");
        setLoopCount(loopCount)
    }
}

const settingValue: SettingContextProps = {
breakTime,
studyTime,
longBreak,
secondLeft,
running,
timeLable,
loopCount,
open,
setOpen,
handleClose,
handleOpen,
setBreakTime,
setStudyTime,
setLongBreak,
setTimeLable,
setSecondLeft,
startPauseCount,
stopCount,
skip,
setLoopCount,
setRunning,

};

return (
<SettingContext.Provider value={settingValue}>
{children}
</SettingContext.Provider>
);
};

export  {SettingProvider,SettingContext};





