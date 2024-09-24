import React, { useState, useCallback, useEffect,useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [password, setPassword] = useState('');

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz";
    if (includeNumbers) str += "0123456789";
    if (includeCharacters) str += "!@#$%^&*()_{}[]~`";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass);

  }, [length, includeCharacters, includeNumbers, setPassword]);

const copyPasswordToClipboard= useCallback(()=>{
  passwordRef.current?.select();
  // passwordRef.current?.setSelectionRange(0,3)
  window.navigator.clipboard.writeText(password)
},[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, includeCharacters, includeNumbers, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 hover:bg-blue-800 focus:ring-3 text-white px-3 py-0.5 shrink-0" 
            onClick={copyPasswordToClipboard} 
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label>Lenght:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={includeNumbers}
              id="numberInput"
              onChange={() => {
                setIncludeNumbers((prev) => !prev);
              }}
              className="cursor-pointer"
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={includeCharacters}
              id="characterInput"
              onChange={() => {
                setIncludeCharacters((prev) => !prev);
              }}
              className="cursor-pointer"
            />
            <label htmlFor="characterInput">Characters</label>

          </div>

        </div>

      </div>
    </>
  );
}

export default App;
