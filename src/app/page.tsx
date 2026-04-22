  const generateProgram = () => {
    // 1. Define the Standard Header
    let code = `// --- TKM AUTO-GENERATED LOGIC v2050 ---\n`;
    code += `// Project: Maintenance Partner | User: Gajanan\n`;
    code += `// Config: ${config.zones} Zones, ${config.robots} Robots, ${config.cylinders} Cyls\n\n`;

    // 2. Build the Zone Logic
    for (let z = 1; z <= config.zones; z++) {
      code += `// --- ZONE ${z} INITIALIZATION ---\n`;
      code += `STR T0\nOUT M${z}00 // Zone ${z} Ready\n\n`;

      // 3. Build Robot Handshake Logic
      for (let r = 1; r <= config.robots; r++) {
        code += `// ROBOT ${r} HANDSHAKE\n`;
        code += `STR M${z}00\nAND X${z}${r}0\nOUT Y${z}${r}0 // Robot ${r} Start\n\n`;
      }

      // 4. Build Cylinder & Sensor Interlocks
      for (let c = 1; c <= config.cylinders; c++) {
        code += `// CYLINDER ${c} CONTROL (Sensor ${c} Interlock)\n`;
        code += `STR M${z}00\nAND X${z}${c}5 // Sensor Input\nOUT Y${z}${c}5 // Cyl Solenoid\n\n`;
      }
    }

    // 5. Output to the Terminal
    setMemory(prev => [...prev, `> Successfully built logic for ${config.zones} Zones.`]);
    
    // Create a Downloadable File
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "TKM_Standard_Program.ldr";
    document.body.appendChild(element);
    element.click();
  };
