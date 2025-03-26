// // ======================מנגינת חופה============

// import { useState, useEffect, useRef } from 'react';

// // תדרים בתווים סולם C Major (דו מז'ור)
// const notes = {
//     a: 523.25, // C (דו)
//     s: 587.33, // D (רה)
//     d: 659.26, // E (מי)
//     f: 698.46, // F (פה)
//     g: 783.99, // G (סול)
//     h: 880.00, // A (לה)
//     j: 987.77, // B (סי)
//     k: 1046.50, // C (דו) (אוקטבה גבוהה)
// };

// const Organ = () => {
//     const [song,] = useState([]);
//     const pressedKeysRef = useRef({});
//     const audioContextRef = useRef(null);

//     useEffect(() => {
//         audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//     }, []);

//     const playNote = (frequency) => {
//         if (!audioContextRef.current) return;

//         const oscillator = audioContextRef.current.createOscillator();
//         oscillator.type = 'triangle';
//         oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime);

//         const gainNode = audioContextRef.current.createGain();
//         gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime);

//         oscillator.connect(gainNode);
//         gainNode.connect(audioContextRef.current.destination);

//         oscillator.start();

//         // הפחתה הדרגתית של הצליל במקום עצירה חדה
//         gainNode.gain.exponentialRampToValueAtTime(0.030, audioContextRef.current.currentTime + 0.9);

//         oscillator.stop(audioContextRef.current.currentTime + 0.9);
//     };

//     useEffect(() => {
//         const handleKeyDown = (e) => {
//             const key = e.key.toLowerCase();
//             if (notes[key] && !pressedKeysRef.current[key]) {
//                 pressedKeysRef.current[key] = true;
//                 playNote(notes[key]);
//             }
//         };

//         const handleKeyUp = (e) => {
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
    const [song,] = useState<string[]>([]);
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
    
        // צליל ארוך יותר עם דעיכה חלקה
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 2);
        oscillator.stop(audioContextRef.current.currentTime + 2.2);
    };
    
    

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            if (key in notes && !pressedKeysRef.current[key]) {
                pressedKeysRef.current[key] = true;
                playNote(notes[key]);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            const key = e.key.toLowerCase();
            delete pressedKeysRef.current[key];
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return (
        <div className="organ">
            <h3>נגן את מנגינת החופה!</h3>
            {Object.keys(notes).map((key) => (
                <div
                    key={key}
                    className={`key ${song.includes(key) ? 'active' : ''}`}
                    style={{
                        width: '40px',
                        height: '150px',
                        margin: '5px',
                        display: 'inline-block',
                        backgroundColor: song.includes(key) ? 'blue' : 'gray',
                        textAlign: 'center',
                        lineHeight: '150px',
                        color: 'white',
                    }}
                >
                    {key.toUpperCase()}
                </div>
            ))}
        </div>
    );
};

export default Organ;
