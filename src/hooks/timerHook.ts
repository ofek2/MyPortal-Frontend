import {useState, useEffect} from 'react';

export function useTimer(waitingTime: number, callback) {
    const [timerOn, setTimerOn] = useState(true);
	const [time, setTime] = useState(waitingTime);
    let intervalId;

    useEffect(() => {
		if (timerOn) {
			intervalId = setInterval(() => {
				setTime(time => time - 1);
			}, 1000);
		} else {
			clearInterval(intervalId);
		}
		

		return () => clearInterval(intervalId);
	}, [timerOn])

	useEffect(() => {
		if (time <= 0) {
			setTimerOn(false);
			callback();
		}
	}, [time])

    return [time, setTime, timerOn, setTimerOn] as const;
}