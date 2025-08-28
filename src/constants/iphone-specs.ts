// iPhone Technical Specifications Database
// Auto-generated from KyThuat/*.md files

interface iPhoneSpec {
  model: string;
  codeName: string;
  display: {
    size: string;
    type: string;
    resolution: string;
    ppi: string;
    brightness: string;
    refreshRate: string;
  };
  camera: {
    main: string;
    ultrawide: string;
    telephoto?: string;
    lidar?: string;
    zoom: string;
    video: string;
    selfie: string;
  };
  performance: {
    chip: string;
    cpu: string;
    gpu: string;
    ram: string;
    neural: string;
    benchmark: {
      antutu?: string;
      geekbench?: string;
    };
  };
  design: {
    dimensions: string;
    weight: string;
    materials: string;
    colors: string[];
  };
  battery: {
    capacity: string;
    life: string;
    charging: {
      wired: string;
      wireless: string;
      magsafe: string;
    };
  };
  connectivity: {
    sim: string;
    port: string;
    wifi: string;
    bluetooth: string;
    cellular: string;
    nfc: boolean;
  };
  other: {
    os: string;
    waterResistance: string;
    faceID: boolean;
    storage: string[];
  };
}

export const IPHONE_SPECS_DATABASE: Record<string, iPhoneSpec> = {
  "iPhone 15 Plus": {
    model: "iPhone 15 Plus",
    codeName: "15PLUS",
    display: {
      size: "6.7 inches",
      type: "LTPO Super Retina XDR OLED",
      resolution: "1290 x 2796 pixels",
      ppi: "~460 ppi",
      brightness: "1000 nits (base), 2000 nits (peak)",
      refreshRate: "60 Hz"
    },
    camera: {
      main: "48 MP, f/1.6, 26mm (wide)",
      ultrawide: "12 MP, f/2.4, 13mm, 120° (ultrawide)",
      zoom: "Optical zoom x2",
      video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps",
      selfie: "12 MP, f/1.9, 23mm (wide)"
    },
    performance: {
      chip: "Apple A16 Bionic (4 nm)",
      cpu: "Hexa-core (2×3.46 GHz Everest + 4×2.02 GHz Sawtooth)",
      gpu: "Apple GPU (5-core graphics)",
      ram: "6GB (LPDDR5)",
      neural: "Neural Engine (16-core)",
      benchmark: {
        antutu: "1,385,649 (v10)",
        geekbench: "6,618 (v6)"
      }
    },
    design: {
      dimensions: "160.9 x 77.8 x 7.8 mm",
      weight: "201g",
      materials: "Ceramic Shield front, Glass back, Aluminum frame",
      colors: ["Vàng", "Hồng", "Xanh Dương", "Xanh Lá", "Đen"]
    },
    battery: {
      capacity: "4383 mAh",
      life: "16-17 tiếng",
      charging: {
        wired: "35W",
        wireless: "15W (Qi2)",
        magsafe: "15W (MagSafe)"
      }
    },
    connectivity: {
      sim: "Nano-SIM & eSIM (Dual SIM)",
      port: "USB Type-C 2.0",
      wifi: "Wi-Fi 6 (802.11ax) dual band",
      bluetooth: "Bluetooth 5.3",
      cellular: "4G/5G",
      nfc: true
    },
    other: {
      os: "iOS 17",
      waterResistance: "IP68",
      faceID: true,
      storage: ["128GB", "256GB", "512GB"]
    }
  },

  "iPhone 15 Pro": {
    model: "iPhone 15 Pro",
    codeName: "15PRO",
    display: {
      size: "6.1 inches",
      type: "LTPO Super Retina XDR OLED",
      resolution: "1179 x 2556 pixels",
      ppi: "~461 ppi",
      brightness: "1000 nits (base), 2000 nits (peak)",
      refreshRate: "120 Hz"
    },
    camera: {
      main: "48 MP, f/1.8, 24mm (wide)",
      ultrawide: "48 MP, f/2.2, 13mm, 120° (ultrawide)",
      telephoto: "12 MP, f/2.8, 77mm (periscope telephoto)",
      lidar: "TOF 3D LiDAR scanner",
      zoom: "Optical zoom x3",
      video: "4K@24/25/30/60/100/120fps, 1080p@25/30/60/120/240fps",
      selfie: "12 MP, f/1.9, 23mm (wide)"
    },
    performance: {
      chip: "Apple A17 Pro (3 nm)",
      cpu: "Hexa-core (2×3.78 GHz + 4×2.11 GHz)",
      gpu: "Apple GPU (6-core graphics)",
      ram: "8GB (LPDDR5)",
      neural: "Neural Engine (16-core)",
      benchmark: {
        antutu: "1,487,203 (v10)",
        geekbench: "7,237 (v6)"
      }
    },
    design: {
      dimensions: "146.6 x 70.6 x 8.3 mm",
      weight: "187g",
      materials: "Ceramic Shield front, Titanium frame",
      colors: ["Titan Tự Nhiên", "Titan Xanh Dương", "Titan Trắng", "Titan Đen"]
    },
    battery: {
      capacity: "3274 mAh",
      life: "12-13 tiếng",
      charging: {
        wired: "35W",
        wireless: "15W (Qi2)",
        magsafe: "25W (MagSafe)"
      }
    },
    connectivity: {
      sim: "Nano-SIM & eSIM (Dual SIM)",
      port: "USB Type-C 3.2 Gen 2",
      wifi: "Wi-Fi 6E (802.11ax) tri-band",
      bluetooth: "Bluetooth 5.3",
      cellular: "4G/5G",
      nfc: true
    },
    other: {
      os: "iOS 17",
      waterResistance: "IP68",
      faceID: true,
      storage: ["128GB", "256GB", "512GB", "1TB"]
    }
  },
  
  "iPhone 16": {
    model: "iPhone 16",
    codeName: "16",
    display: {
      size: "6.1 inches",
      type: "LTPO Super Retina XDR OLED",
      resolution: "1179 x 2556 pixels",
      ppi: "~460 ppi",
      brightness: "1000 nits (base), 2000 nits (peak)",
      refreshRate: "60 Hz"
    },
    camera: {
      main: "48 MP, f/1.6, 26mm (wide)",
      ultrawide: "12 MP, f/2.2, 13mm, 120° (ultrawide)",
      zoom: "Optical zoom x2",
      video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps",
      selfie: "12 MP"
    },
    performance: {
      chip: "Apple A18 (3 nm)",
      cpu: "Hexa-core (2×4.04 GHz + 4×2.2 GHz)",
      gpu: "Apple GPU (5-core graphics)",
      ram: "8GB (LPDDR5X)",
      neural: "Neural Engine (16-core)",
      benchmark: {
        antutu: "1,510,034 (v10)",
        geekbench: "7,901 (v6)"
      }
    },
    design: {
      dimensions: "147.6 x 71.6 x 7.8 mm",
      weight: "170g",
      materials: "Ceramic Shield Gen 2024, Glass back, Aluminum frame",
      colors: ["Xanh Lưu Ly", "Xanh Lá", "Hồng", "Trắng", "Đen"]
    },
    battery: {
      capacity: "3582 mAh",
      life: "15-16 tiếng",
      charging: {
        wired: "35W",
        wireless: "15W (Qi2)",
        magsafe: "25W (MagSafe)"
      }
    },
    connectivity: {
      sim: "Nano-SIM & eSIM (Dual SIM)",
      port: "USB Type-C 2.0",
      wifi: "Wi-Fi 7 (802.11be) tri-band",
      bluetooth: "Bluetooth 5.3",
      cellular: "4G/5G",
      nfc: true
    },
    other: {
      os: "iOS 18",
      waterResistance: "IP68",
      faceID: true,
      storage: ["128GB", "256GB", "512GB"]
    }
  },

  "iPhone 16 Plus": {
    model: "iPhone 16 Plus",
    codeName: "16PLUS",
    display: {
      size: "6.7 inches",
      type: "LTPO Super Retina XDR OLED",
      resolution: "1290 x 2796 pixels",
      ppi: "~460 ppi",
      brightness: "1000 nits (base), 2000 nits (peak)",
      refreshRate: "60 Hz"
    },
    camera: {
      main: "48 MP, f/1.6, 26mm (wide)",
      ultrawide: "12 MP, f/2.2, 13mm, 120° (ultrawide)",
      zoom: "Optical zoom x2",
      video: "4K@24/25/30/60fps, 1080p@25/30/60/120/240fps",
      selfie: "12 MP"
    },
    performance: {
      chip: "Apple A18 (3 nm)",
      cpu: "Hexa-core (2×4.04 GHz + 4×2.2 GHz)",
      gpu: "Apple GPU (5-core graphics)",
      ram: "8GB (LPDDR5X)",
      neural: "Neural Engine (16-core)",
      benchmark: {
        antutu: "1,552,895 (v10)",
        geekbench: "7,809 (v6)"
      }
    },
    design: {
      dimensions: "160.9 x 77.8 x 7.8 mm",
      weight: "199g",
      materials: "Ceramic Shield Gen 2024, Glass back, Aluminum frame",
      colors: ["Xanh Lưu Ly", "Xanh Lá", "Hồng", "Trắng", "Đen"]
    },
    battery: {
      capacity: "4674 mAh",
      life: "18-19 tiếng",
      charging: {
        wired: "35W",
        wireless: "15W (Qi2)",
        magsafe: "25W (MagSafe)"
      }
    },
    connectivity: {
      sim: "Nano-SIM & eSIM (Dual SIM)",
      port: "USB Type-C 2.0",
      wifi: "Wi-Fi 7 (802.11be) tri-band",
      bluetooth: "Bluetooth 5.3",
      cellular: "4G/5G",
      nfc: true
    },
    other: {
      os: "iOS 18",
      waterResistance: "IP68",
      faceID: true,
      storage: ["128GB", "256GB", "512GB"]
    }
  },
  
  "iPhone 16 Pro": {
    model: "iPhone 16 Pro",
    codeName: "16PRO",
    display: {
      size: "6.3 inches",
      type: "LTPO Super Retina XDR OLED",
      resolution: "1206 x 2622 pixels",
      ppi: "~458 ppi",
      brightness: "1000 nits (base), 2000 nits (peak)",
      refreshRate: "120 Hz"
    },
    camera: {
      main: "48 MP, f/1.8, 24mm (wide)",
      ultrawide: "48 MP, f/2.2, 13mm, 120° (ultrawide)",
      telephoto: "12 MP, f/2.8, 120mm (periscope telephoto)",
      lidar: "TOF 3D LiDAR scanner",
      zoom: "Optical zoom x5",
      video: "4K@24/25/30/60/100/120fps, 1080p@25/30/60/120/240fps",
      selfie: "12 MP TrueDepth camera"
    },
    performance: {
      chip: "Apple A18 Pro (3 nm)",
      cpu: "Hexa-core (2×4.04 GHz + 4×2.2 GHz)",
      gpu: "Apple GPU (6-core graphics)",
      ram: "8GB (LPDDR5X)",
      neural: "Neural Engine (16-core)",
      benchmark: {
        antutu: "1,668,381 (v10)",
        geekbench: "8,283 (v6)"
      }
    },
    design: {
      dimensions: "149.6 x 71.5 x 8.3 mm",
      weight: "199g",
      materials: "Ceramic Shield Gen 2024, Titanium frame",
      colors: ["Titan Sa Mạc", "Titan Tự Nhiên", "Titan Trắng", "Titan Đen"]
    },
    battery: {
      capacity: "3582 mAh",
      life: "14-17 tiếng",
      charging: {
        wired: "35W",
        wireless: "15W (Qi2)",
        magsafe: "25W (MagSafe)"
      }
    },
    connectivity: {
      sim: "Nano-SIM & eSIM (Dual SIM)",
      port: "USB Type-C 3.2 Gen 2",
      wifi: "Wi-Fi 7 (802.11be) tri-band",
      bluetooth: "Bluetooth 5.3",
      cellular: "4G/5G",
      nfc: true
    },
    other: {
      os: "iOS 18",
      waterResistance: "IP68",
      faceID: true,
      storage: ["128GB", "256GB", "512GB", "1TB"]
    }
  },

  "iPhone 16 Pro Max": {
    model: "iPhone 16 Pro Max",
    codeName: "16PRM",
    display: {
      size: "6.9 inches",
      type: "LTPO Super Retina XDR OLED",
      resolution: "1320 x 2868 pixels",
      ppi: "~460 ppi",
      brightness: "1000 nits (base), 2000 nits (peak)",
      refreshRate: "120 Hz"
    },
    camera: {
      main: "48 MP, f/1.8, 24mm (wide)",
      ultrawide: "48 MP, f/2.2, 13mm, 120° (ultrawide)",
      telephoto: "12 MP, f/2.8, 120mm (periscope telephoto)",
      lidar: "TOF 3D LiDAR scanner",
      zoom: "Optical zoom x5",
      video: "4K@24/25/30/60/100/120fps, 1080p@25/30/60/120/240fps",
      selfie: "12 MP"
    },
    performance: {
      chip: "Apple A18 Pro (3 nm)",
      cpu: "Hexa-core (2×4.04 GHz + 4×2.2 GHz)",
      gpu: "Apple GPU (6-core graphics)",
      ram: "8GB (LPDDR5X)",
      neural: "Neural Engine (16-core)",
      benchmark: {
        antutu: "1,723,557 (v10)",
        geekbench: "7,968 (v6)"
      }
    },
    design: {
      dimensions: "163 x 77.6 x 8.3 mm",
      weight: "227g",
      materials: "Ceramic Shield Gen 2024, Titanium frame",
      colors: ["Titan Sa Mạc", "Titan Tự Nhiên", "Titan Trắng", "Titan Đen"]
    },
    battery: {
      capacity: "4685 mAh",
      life: "17-18 tiếng",
      charging: {
        wired: "35W",
        wireless: "15W (Qi2)",
        magsafe: "25W (MagSafe)"
      }
    },
    connectivity: {
      sim: "Nano-SIM & eSIM (Dual SIM)",
      port: "USB Type-C 3.2 Gen 2",
      wifi: "Wi-Fi 7 (802.11be) tri-band",
      bluetooth: "Bluetooth 5.3",
      cellular: "4G/5G",
      nfc: true
    },
    other: {
      os: "iOS 18",
      waterResistance: "IP68",
      faceID: true,
      storage: ["256GB", "512GB", "1TB"]
    }
  }
};

// Helper function to get specs by model
export const getSpecsByModel = (model: string): iPhoneSpec | null => {
  return IPHONE_SPECS_DATABASE[model] || null;
};

// Get available iPhone models
export const getAvailableModels = (): string[] => {
  return Object.keys(IPHONE_SPECS_DATABASE);
};

// Format specs for display
export const formatSpecsForDisplay = (specs: iPhoneSpec) => {
  return {
    "Màn hình": `${specs.display.size} ${specs.display.type}, ${specs.display.resolution}, ${specs.display.refreshRate}`,
    "Camera chính": specs.camera.main,
    "Camera góc rộng": specs.camera.ultrawide,
    "Camera tele": specs.camera.telephoto || "Không có",
    "Zoom quang học": specs.camera.zoom,
    "Chip xử lý": specs.performance.chip,
    "RAM": specs.performance.ram,
    "Kích thước": specs.design.dimensions,
    "Trọng lượng": specs.design.weight,
    "Pin": `${specs.battery.capacity} - ${specs.battery.life}`,
    "Sạc": `Có dây: ${specs.battery.charging.wired}, Không dây: ${specs.battery.charging.wireless}`,
    "Cổng kết nối": specs.connectivity.port,
    "Hệ điều hành": specs.other.os,
    "Kháng nước": specs.other.waterResistance,
    "Màu sắc": specs.design.colors.join(", "),
    "Dung lượng": specs.other.storage.join(", ")
  };
};