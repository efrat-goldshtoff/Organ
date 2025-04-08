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
    
//         // צליל עם דעיכה חלקה
//         gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 2);
//         oscillator.stop(audioContextRef.current.currentTime + 2.2);
//     };

//     useEffect(() => {
//         const handleKeyDown = (e: KeyboardEvent) => {
//             const key = e.key.toLowerCase();
//             if (key in notes && !pressedKeysRef.current[key]) {
//                 pressedKeysRef.current[key] = true;
//                 setActiveKeys((prev) => ({ ...prev, [key]: true }));
//                 playNote(notes[key]);
//             }
//         };

//         const handleKeyUp = (e: KeyboardEvent) => {
//             const key = e.key.toLowerCase();
//             delete pressedKeysRef.current[key];
//             setActiveKeys((prev) => ({ ...prev, [key]: false }));
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



import { useState, useEffect, useRef } from 'react';

// תדרים עבור כל קליד
const notes: { [key: string]: number } = {
    a: 261.63,  // C
    w: 277.18,  // C#
    s: 293.66,  // D
    e: 311.13,  // D#
    d: 329.63,  // E
    f: 349.23,  // F
    t: 369.99,  // F#
    g: 392.00,  // G
    y: 415.30,  // G#
    h: 440.00,  // A
    u: 466.16,  // A#
    j: 493.88,  // B
    k: 523.25,  // C' (האוקטבה הבאה)
    o: 554.37,  // C#'
    l: 587.33,  // D'
    p: 622.25,  // D#'
    ';': 659.26, // E'
    "'": 698.46, // F'
    '[': 739.99, // F#'
    ']': 783.99, // G'
    '\\': 830.61, // G#'
    z: 880.00,  // A'
    x: 932.33,  // A#'
    c: 987.77,  // B'
};

export const Organ1 = () => {
    const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({});
    const pressedKeysRef = useRef<{ [key: string]: boolean }>({});
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorsRef = useRef<{ [key: string]: OscillatorNode }>({}); // שמור על האוסילטורים

    useEffect(() => {
        audioContextRef.current = new AudioContext();
    }, []);

    const playNote = (frequency: number, key: string) => {
        if (!audioContextRef.current) return;

        const oscillator = audioContextRef.current.createOscillator();
        oscillator.type = 'triangle';  // או סוג אחר לפי ההעדפה שלך
        oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);

        const gainNode = audioContextRef.current.createGain();
        gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        oscillator.start();

        // שמירה על האוסילטור כדי שנוכל להפסיק אותו בצורה נכונה
        oscillatorsRef.current[key] = oscillator;

        // דעיכה חלקה
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 2);
        oscillator.stop(audioContextRef.current.currentTime + 2.2); // עצירת האוסילטור אחרי 2.2 שניות
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key in notes && !pressedKeysRef.current[key]) {
                pressedKeysRef.current[key] = true;
                setActiveKeys((prev) => ({ ...prev, [key]: true }));
                playNote(notes[key], key);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            delete pressedKeysRef.current[key];
            setActiveKeys((prev) => ({ ...prev, [key]: false }));

            // הפסקת הצליל עם דעיכה
            if (oscillatorsRef.current[key]) {
                const oscillator = oscillatorsRef.current[key];
                const gainNode = oscillator.context.createGain();
                // oscillator.connect(gainNode);
                // gainNode.connect(oscillator.context.destination);
                
                // דעיכה בצורה חלקה כשמשתחרר מקש
                gainNode.gain.setValueAtTime(0.1, oscillator.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, oscillator.context.currentTime + 1); // דעיכה מהירה יותר
                oscillator.stop(oscillator.context.currentTime + 1.2);
            }
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
            {/* <h3>נגן את מנגינת החופה!</h3> */}
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







// // תדרים עבור כל קליד
// const notes: { [key: string]: number } = {
//     a: 261.63,  // C
//     w: 277.18,  // C#
//     s: 293.66,  // D
//     e: 311.13,  // D#
//     d: 329.63,  // E
//     f: 349.23,  // F
//     t: 369.99,  // F#
//     g: 392.00,  // G
//     y: 415.30,  // G#
//     h: 440.00,  // A
//     u: 466.16,  // A#
//     j: 493.88,  // B
//     k: 523.25,  // C' (האוקטבה הבאה)
//     o: 554.37,  // C#'
//     l: 587.33,  // D'
//     p: 622.25,  // D#'
//     ';': 659.26, // E'
//     "'": 698.46, // F'
//     '[': 739.99, // F#'
//     ']': 783.99, // G'
//     '\\': 830.61, // G#'
//     z: 880.00,  // A'
//     x: 932.33,  // A#'
//     c: 987.77,  // B'
// };

export const Organ2 = () => {
    const [activeKeys, setActiveKeys] = useState<{ [key: string]: boolean }>({});
    const pressedKeysRef = useRef<{ [key: string]: boolean }>({});
    const audioContextRef = useRef<AudioContext | null>(null);
    const oscillatorsRef = useRef<{ [key: string]: OscillatorNode }>({}); // שמור על האוסילטורים

    useEffect(() => {
        audioContextRef.current = new AudioContext();
    }, []);

    const playNote = (frequency: number, key: string) => {
        if (!audioContextRef.current) return;

        const oscillator = audioContextRef.current.createOscillator();
        oscillator.type = 'triangle';  // סוג האוסילטור
        oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);

        const gainNode = audioContextRef.current.createGain();
        gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);

        oscillator.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);

        oscillator.start();

        // שמירה על האוסילטור כדי שנוכל להפסיק אותו בצורה נכונה
        oscillatorsRef.current[key] = oscillator;

        // דעיכה חלקה
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 2);
        oscillator.stop(audioContextRef.current.currentTime + 2.2); // עצירת האוסילטור אחרי 2.2 שניות
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key in notes && !pressedKeysRef.current[key]) {
                pressedKeysRef.current[key] = true;
                setActiveKeys((prev) => ({ ...prev, [key]: true }));
                playNote(notes[key], key);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            delete pressedKeysRef.current[key];
            setActiveKeys((prev) => ({ ...prev, [key]: false }));

            // הפסקת הצליל עם דעיכה
            if (oscillatorsRef.current[key]) {
                const oscillator = oscillatorsRef.current[key];
                const gainNode = oscillator.context.createGain();
                gainNode.connect(oscillator.context.destination);
                
                // דעיכה בצורה חלקה
                gainNode.gain.setValueAtTime(0.1, oscillator.context.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, oscillator.context.currentTime + 1); // דעיכה מהירה יותר
                oscillator.stop(oscillator.context.currentTime + 1.2);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // עיצוב הקלידים (לבנים ושחורים)
    const renderKey = (key: string, index: number) => {
        const isBlackKey = ['w', 'e', 't', 'y', 'u', 'o', 'p', ';', "'", '[', ']', '\\'].includes(key);
        return (
            <div
                key={key}
                className={`key ${isBlackKey ? 'black' : 'white'}`}
                style={{
                    width: isBlackKey ? '30px' : '50px',
                    height: '150px',
                    backgroundColor: activeKeys[key] ? (isBlackKey ? 'darkgray' : 'orange') : (isBlackKey ? 'black' : 'white'),
                    textAlign: 'center',
                    lineHeight: '150px',
                    color: isBlackKey ? 'white' : 'black',
                    fontSize: '20px',
                    border: '1px solid black',
                    position: 'relative',
                    zIndex: isBlackKey ? 1 : 0,
                    marginLeft: isBlackKey ? '-15px' : '0',
                    marginRight: isBlackKey ? '-15px' : '0',
                }}
            >
                {key.toUpperCase()}
            </div>
        );
    };

    return (
        <div className="organ" style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0' }}>
                {Object.keys(notes).map((key, index) => renderKey(key, index))}
            </div>
        </div>
    );
};
