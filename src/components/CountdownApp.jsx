import { useState, useEffect } from 'react';
import '../App.css';
import LiveCountdown from "../LiveCountdown";
import TopBar from "../components/TopBar";

//function App() {
function CountdownApp() {
    const [endDateTime, setEndDateTime] = useState('');
    const [theme, setTheme] = useState('dark');
    const [imageUrl, setImageUrl] = useState('');
    const [bgColor, setBgColor] = useState('#000000');
    const [fontColor, setFontColor] = useState('#ffffff');
    const [fontSize, setFontSize] = useState(24);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [width, setWidth] = useState(400);
    const [height, setHeight] = useState(100);
    const [savedTimers, setSavedTimers] = useState([]);
    const [savedTimerId, setSavedTimerId] = useState(null);
    const [canSave, setCanSave] = useState(false);


    //preview
    const [previewConfig, setPreviewConfig] = useState(null);

    useEffect(() => {
        const fetchTimers = async () => {
            //const res = await fetch('http://localhost:5000/api/timers');
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/timers`);
            const data = await res.json();
            setSavedTimers(data);
        };

        fetchTimers();
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem('timers');
        if (saved) {
            setSavedTimers(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        //localStorage.setItem('timers', JSON.stringify(savedTimers));
    }, [savedTimers]);

    useEffect(() => {
        const handler = () => {
            const timers =
                JSON.parse(localStorage.getItem("savedTimers")) || [];

            timers.push({
                endDateTime,
                theme,
                bgColor,
                fontColor,
                fontSize,
                width,
                height,
                createdAt: Date.now(),
            });

            //localStorage.setItem("savedTimers", JSON.stringify(timers));
        };

        //window.addEventListener("save-timer", handler);
        return () => window.removeEventListener("save-timer", handler);
    }, [endDateTime, theme, bgColor, fontColor, fontSize, width, height]);

    /* const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            endDateTime,
            theme,
            bgColor,
            fontColor,
            fontSize,
            fontFamily,
            width,
            height
        };

        const res = await fetch('http://localhost:5000/api/saveTimer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        const imageUrl = `http://localhost:5000/images/${data.timerId}.gif`;
        setImageUrl(imageUrl);
    }; */

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ONLY generate preview
        updatePreview();
        setCanSave(true);
        // allow saving later via ❤️ (we’ll wire this next)
        // setCanSave(true);  ← we’ll add in next step
    };

    const handler = async () => {
        console.log("🔥 SAVE HANDLER CALLED");

        const payload = {
            endDateTime,
            theme,
            bgColor,
            fontColor,
            fontSize,
            fontFamily,
            width,
            height
        };

        //const res = await fetch("http://localhost:5000/api/saveTimer", {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/saveTimer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        setSavedTimerId(data.timerId);
    };

    const handleLogout = () => {
        localStorage.removeItem("userdata");
        window.location.href = "/login";
    };

    const updatePreview = () => {
        setPreviewConfig({
            endDateTime,
            fontSize,
            width,
            height,
            fontColor,
            bgColor,
            fontFamily,
            theme
        });
    };


    return (
        <div className="container">
            <TopBar onSave={handler} canSave={canSave} />
            <h2>Email Countdown Generator</h2>
            <div className="layout-grid">
                <form onSubmit={handleSubmit} className="left-panel">
                    <label>
                        End Date & Time:
                        <input type="datetime-local" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} required />
                    </label>

                    <label>
                        Theme:
                        <select
                            value={theme}
                            onChange={(e) => {
                                const selected = e.target.value;
                                setTheme(selected);
                                switch (selected) {
                                    case 'dark':
                                        setBgColor('#000000');
                                        setFontColor('#ffffff');
                                        setFontSize(24);
                                        setFontFamily('Arial');
                                        break;
                                    case 'light':
                                        setBgColor('#ffffff');
                                        setFontColor('#000000');
                                        setFontSize(24);
                                        setFontFamily('Georgia');
                                        break;
                                    case 'neon':
                                        setBgColor('#000000');
                                        setFontColor('#39ff14');
                                        setFontSize(26);
                                        setFontFamily('Courier');
                                        break;
                                    default:
                                        break;
                                }
                            }}>
                            <option value="dark">Dark</option>
                            <option value="light">Light</option>
                            <option value="neon">Neon</option>
                        </select>
                    </label>

                    <label>
                        Background Color:
                        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                    </label>

                    <label>
                        Font Color:
                        <input type="color" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
                    </label>

                    <label>
                        Font Size (px):
                        <input type="number" value={fontSize} onChange={(e) => { setFontSize(e.target.value); updatePreview(); }} min="12" max="100" />
                    </label>

                    <label>
                        Font Family:
                        <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
                            <option value="Arial">Arial</option>
                            <option value="Courier">Courier</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Verdana">Verdana</option>
                        </select>
                    </label>

                    <label>
                        Width (px):
                        <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} min="100" max="1000" />
                    </label>

                    <label>
                        Height (px):
                        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} min="50" max="500" />
                    </label>

                    <div className="generate-button-wrapper">
                        <button type="submit">Generate Countdown</button>
                    </div>
                </form>
                <div style={{ marginTop: "1rem", fontSize: "2rem", textAlign: "center" }}>
                    <LiveCountdown endDateTime="2025-07-30T23:59:00" />
                </div>


                {previewConfig && (
                    <div style={{
                        backgroundColor: previewConfig.backgroundColor,
                        color: previewConfig.fontColor,
                        fontFamily: previewConfig.fontFamily,
                        fontSize: `${previewConfig.fontSize}px`,
                        width: `${previewConfig.width}px`,
                        height: `${previewConfig.height}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '1rem auto',
                        borderRadius: '8px'
                    }}>
                        <LiveCountdown
                            endDateTime={endDateTime || "2025-07-30T23:59:00"}
                            bgColor={bgColor}
                            fontColor={fontColor}
                            fontSize={fontSize}
                            fontFamily={fontFamily}
                            width={width}
                            height={height}
                        />
                    </div>
                )}


                <div className="right-panel">
                    <h3>Saved Timers</h3>
                    {savedTimers.map(timer => (
                        <div key={timer._id} className="timer-card">
                            <strong>{new Date(timer.endDateTime).toLocaleString()}</strong><br />
                            <a href={`http://localhost:5000/images/${timer._id}.gif`} target="_blank" rel="noreferrer">
                                <img
                                    src={`http://localhost:5000/images/${timer._id}.gif`}
                                    alt="Saved Countdown"
                                    width={timer.width || 400}
                                    height={timer.height || 100}
                                />
                            </a>
                            <br />
                            <button onClick={async () => {
                                const confirmDelete = window.confirm("Are you sure you want to delete this timer?");
                                if (!confirmDelete) return;
                                //await fetch(`http://localhost:5000/api/timers/${timer._id}`, { method: 'DELETE' });
                                await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/timers/${timer._id}`, { method: 'DELETE' });
                                setSavedTimers(savedTimers.filter(t => t._id !== timer._id));
                            }}>
                                🗑 Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/*  {imageUrl && (
                <div className="preview-section">
                    <h3>Live Preview:</h3>
                    <img src={imageUrl} alt="Countdown Timer" />

                    <h4>Embed Code:</h4>
                    <code>{`<img src="${imageUrl}" alt="Countdown Timer" />`}</code>
                </div>
            )} */}

            {savedTimerId && (
                <div className="embed-section">
                    <h3>Preview</h3>

                    <img
                        src={`http://localhost:5000/images/${savedTimerId}.gif`}
                        alt="Countdown Preview"
                        style={{ display: "block", margin: "1rem auto" }}
                    />

                    <h4>Embed Code</h4>
                    <textarea
                        readOnly
                        value={`<img src="http://localhost:5000/images/${savedTimerId}.gif" alt="Countdown Timer" />`}
                        style={{
                            width: "100%",
                            height: "70px",
                            marginTop: "0.5rem"
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default CountdownApp;


//   return (
//     <div className="container">
//       <h2>Email Countdown Generator</h2>
//        <div className="main-content">
//       <div className="form-wrapper">
//       <form onSubmit={handleSubmit}>
//         <label>
//           End Date & Time:
//           <input
//             type="datetime-local"
//             value={endDateTime}
//             onChange={(e) => setEndDateTime(e.target.value)}
//             required
//           />
//         </label>
//         <br /><br />

//        {/*  <label>
//           Theme:
//           <select value={theme} onChange={(e) => setTheme(e.target.value)}>
//             <option value="dark">Dark</option>
//             <option value="light">Light (future)</option>
//           </select>
//         </label> */}
//         <br /><br />

//         <label>
//           Background Color:
//           <input
//             type="color"
//             value={bgColor}
//             onChange={(e) => setBgColor(e.target.value)}
//           />
//         </label>
//         <br /><br />

//         <label>
//           Font Color:
//           <input
//             type="color"
//             value={fontColor}
//             onChange={(e) => setFontColor(e.target.value)}
//           />
//         </label>
//         <br /><br />

//         <label>
//           Font Size (px):
//           <input
//             type="number"
//             value={fontSize}
//             onChange={(e) => setFontSize(e.target.value)}
//             min="12"
//             max="100"
//           />
//         </label>
//         <br /><br />

//         <label>
//           Font Family:
//           <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
//             <option value="Arial">Arial</option>
//             <option value="Courier">Courier</option>
//             <option value="Georgia">Georgia</option>
//             <option value="Verdana">Verdana</option>
//           </select>
//         </label>
//         <label>
//   Width (px):
//   <input
//     type="number"
//     value={width}
//     onChange={(e) => setWidth(e.target.value)}
//     min="100"
//     max="1000"
//   />
// </label>
// <br /><br />

// <label>
//   Height (px):
//   <input
//     type="number"
//     value={height}
//     onChange={(e) => setHeight(e.target.value)}
//     min="50"
//     max="500"
//   />
// </label>
// <br /><br />
// <label>
//   Theme:
//   <select
//     value={theme}
//     onChange={(e) => {
//       const selected = e.target.value;
//       setTheme(selected);

//       // Apply predefined styles
//       switch (selected) {
//         case 'dark':
//           setBgColor('#000000');
//           setFontColor('#ffffff');
//           setFontSize(24);
//           setFontFamily('Arial');
//           break;
//         case 'light':
//           setBgColor('#ffffff');
//           setFontColor('#000000');
//           setFontSize(24);
//           setFontFamily('Georgia');
//           break;
//         case 'neon':
//           setBgColor('#000000');
//           setFontColor('#39ff14');
//           setFontSize(26);
//           setFontFamily('Courier');
//           break;
//         default:
//           break;
//       }
//     }}
//   >
//     <option value="">-- Select Theme --</option>
//     <option value="dark">Dark</option>
//     <option value="light">Light</option>
//     <option value="neon">Neon</option>
//   </select>
// </label>
// <br /><br />
// <div className="saved-timers">
//   <h3>Saved Timers</h3>
//   {savedTimers.map(timer => (
//     <div key={timer._id} className="timer-card">
//       <strong>{new Date(timer.endDateTime).toLocaleString()}</strong><br />
//       <a href={`http://localhost:5000/images/${timer._id}.gif`} target="_blank" rel="noreferrer">
//         <img
//           src={`http://localhost:5000/images/${timer._id}.gif`}
//           alt="Saved Countdown"
//           width={timer.width || 400}
//           height={timer.height || 100}
//         />
//       </a>
//       <br />
//       <button
//         onClick={async () => {
//           const confirmDelete = window.confirm("Are you sure you want to delete this timer?");
//           if (!confirmDelete) return;

//           await fetch(`http://localhost:5000/api/timers/${timer._id}`, {
//             method: 'DELETE',
//           });

//           setSavedTimers(savedTimers.filter(t => t._id !== timer._id));
//         }}
//       >
//         🗑 Delete
//       </button>
//     </div>
//   ))}
// </div>
//         <br /><br />

//         <button type="submit">Generate Countdown</button>
//       </form>
// </div>
//       {imageUrl && (
//         <>
//           <h3>Live Preview:</h3>
//           <img src={imageUrl} alt="Countdown Timer" />

//           <h4>Embed Code:</h4>
//           <code>{`<img src="${imageUrl}" alt="Countdown Timer" />`}</code>
//         </>
//       )}
//     </div>
//     </div>
//   );