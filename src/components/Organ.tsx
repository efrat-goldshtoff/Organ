// import { useState, useEffect, useRef } from 'react';

// const notes: { [key: string]: number } = {
//     a: 523.25, // C
//     s: 587.33, // D
//     d: 659.26, // E
//     f: 698.46, // F
//     g: 783.99, // G
//     h: 880.00, // A
//     j: 987.77, // B
//     k: 1046.50, // C (Octave up)
// };

// const Organ = () => {
//     const [song,] = useState<string[]>([]);
//     const pressedKeysRef = useRef<{ [key: string]: boolean }>({});
//     const audioContextRef = useRef<AudioContext | null>(null);

//     useEffect(() => {
//         audioContextRef.current = new AudioContext();
//     }, []);

//     const playNote = (frequency: number) => {
//         if (!audioContextRef.current) return;
    
//         const oscillator = audioContextRef.current.createOscillator();
//         oscillator.type = 'triangle';
//         oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    
//         const gainNode = audioContextRef.current.createGain();
//         gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    
//         oscillator.connect(gainNode);
//         gainNode.connect(audioContextRef.current.destination);
    
//         oscillator.start();
    
//         // צליל ארוך יותר עם דעיכה חלקה
//         gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 2);
//         oscillator.stop(audioContextRef.current.currentTime + 2.2);
//     };
    
    

//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             const key = e.key.toLowerCase();
//             if (key in notes && !pressedKeysRef.current[key]) {
//                 pressedKeysRef.current[key] = true;
//                 playNote(notes[key]);
//             }
//         };

//         const handleKeyUp = (e: KeyboardEvent) => {
//             const key = e.key.toLowerCase();
//             delete pressedKeysRef.current[key];
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, []);

//     return (
//         <div className="organ">
//             <h3>נגן את מנגינת החופה!</h3>
//             {Object.keys(notes).map((key) => (
//                 <div
//                     key={key}
//                     className={`key ${song.includes(key) ? 'active' : ''}`}
//                     style={{
//                         width: '40px',
//                         height: '150px',
//                         margin: '5px',
//                         display: 'inline-block',
//                         backgroundColor: song.includes(key) ? 'blue' : 'gray',
//                         textAlign: 'center',
//                         lineHeight: '150px',
//                         color: 'white',
//                     }}
//                 >
//                     {key.toUpperCase()}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default Organ;






import { useState, useEffect, useRef } from 'react';

const notes: { [key: string]: number } = {
    a: 523.25, // C
    s: 587.33, // D
    d: 659.26, // E
    f: 698.46, // F
    g: 783.99, // G
    h: 880.00, // A
    j: 987.77, // B
    k: 1046.50, // C (Octave up)
};

const Organ = () => {
    const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({});
    const pressedKeysRef = useRef<{ [key: string]: boolean }>({});
    const audioContextRef = useRef<AudioContext | null>(null);

    useEffect(() => {
        audioContextRef.current = new AudioContext();
    }, []);

    const playNote = (frequency: number) => {
        if (!audioContextRef.current) return;
    
        const oscillator = audioContextRef.current.createOscillator();
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);
    
        const gainNode = audioContextRef.current.createGain();
        gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
    
        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
    
        oscillator.start();
    
        // צליל עם דעיכה חלקה
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 2);
        oscillator.stop(audioContextRef.current.currentTime + 2.2);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key in notes && !pressedKeysRef.current[key]) {
                pressedKeysRef.current[key] = true;
                setActiveKeys((prev) => ({ ...prev, [key]: true }));
                playNote(notes[key]);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            delete pressedKeysRef.current[key];
            setActiveKeys((prev) => ({ ...prev, [key]: false }));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="organ" style={{ textAlign: 'center', padding: '20px' }}>
            <h3>נגן את מנגינת החופה!</h3>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                {Object.keys(notes).map((key) => (
                    <div
                        key={key}
                        className="key"
                        style={{
                            width: '50px',
                            height: '150px',
                            backgroundColor: activeKeys[key] ? 'orange' : 'gray',
                            textAlign: 'center',
                            lineHeight: '150px',
                            color: 'white',
                            fontSize: '20px',
                            borderRadius: '5px',
                            transition: 'background-color 0.2s ease-in-out',
                        }}
                    >
                        {key.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Organ;




// import { useState, useEffect, useRef } from 'react';

// const notes: { [key: string]: number } = {
//     a: 523.25, // C
//     s: 587.33, // D
//     d: 659.26, // E
//     f: 698.46, // F
//     g: 783.99, // G
//     h: 880.00, // A
//     j: 987.77, // B
//     k: 1046.50, // C (Octave up)
// };

// const Organ = () => {
//     const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({});
//     const pressedKeysRef = useRef<{ [key: string]: boolean }>({});
//     const audioContextRef = useRef<AudioContext | null>(null);
//     const oscillatorsRef = useRef<{ [key: string]: OscillatorNode | null }>({}); // שמירת הצלילים

//     useEffect(() => {
//         audioContextRef.current = new AudioContext();
//     }, []);

//     const playNote = (key: string) => {
//         if (!audioContextRef.current || oscillatorsRef.current[key]) return;

//         const oscillator = audioContextRef.current.createOscillator();
//         const gainNode = audioContextRef.current.createGain();

//         oscillator.type = 'triangle';
//         oscillator.frequency.setValueAtTime(notes[key], audioContextRef.current.currentTime);
        
//         gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);
        
//         oscillator.connect(gainNode);
//         gainNode.connect(audioContextRef.current.destination);

//         oscillator.start();

//         oscillatorsRef.current[key] = oscillator; // שמירת האובייקט כדי שנוכל לעצור אותו
//     };

//     const stopNote = (key: string) => {
//         if (oscillatorsRef.current[key]) {
//             oscillatorsRef.current[key]?.stop();
//             oscillatorsRef.current[key] = null;
//         }
//     };

//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             const key = e.key.toLowerCase();
//             if (key in notes && !pressedKeysRef.current[key]) {
//                 pressedKeysRef.current[key] = true;
//                 setActiveKeys((prev) => ({ ...prev, [key]: true }));
//                 playNote(key);
//             }
//         };

//         const handleKeyUp = (e: KeyboardEvent) => {
//             const key = e.key.toLowerCase();
//             if (pressedKeysRef.current[key]) {
//                 delete pressedKeysRef.current[key];
//                 setActiveKeys((prev) => ({ ...prev, [key]: false }));
//                 stopNote(key);
//             }
//         };

//         window.addEventListener('keydown', handleKeyDown);
//         window.addEventListener('keyup', handleKeyUp);

//         return () => {
//             window.removeEventListener('keydown', handleKeyDown);
//             window.removeEventListener('keyup', handleKeyUp);
//         };
//     }, []);

//     return (
//         <div className="organ" style={{ textAlign: 'center', padding: '20px' }}>
//             <h3>נגן את מנגינת החופה!</h3>
//             <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
//                 {Object.keys(notes).map((key) => (
//                     <div
//                         key={key}
//                         className="key"
//                         style={{
//                             width: '50px',
//                             height: '150px',
//                             backgroundColor: activeKeys[key] ? 'orange' : 'gray',
//                             textAlign: 'center',
//                             lineHeight: '150px',
//                             color: 'white',
//                             fontSize: '20px',
//                             borderRadius: '5px',
//                             transition: 'background-color 0.2s ease-in-out',
//                         }}
//                     >
//                         {key.toUpperCase()}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Organ;


