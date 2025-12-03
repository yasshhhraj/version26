'use client';
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { loadPolygonMaskPlugin } from "@tsparticles/plugin-polygon-mask";

const ParticlesPage = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadPolygonMaskPlugin(engine); // REQUIRED FOR POLYGON MASK
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: any = useMemo(
    () => ({
  "fullScreen": {
    "enable": false,
    "zIndex": 0
  },
  "detectRetina": false,
  "fpsLimit": 60,
  "interactivity": {
    "detectsOn": "canvas",
    "events": {
      "onHover": {
        "enable": true,
        "mode": "grab"
      },
      "onClick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "links": {
          "opacity": 1
        }
      },
      "push": {
        "quantity": 2
      }
    }
  },
  "particles": {
    "number": {
      "value": 80,
      "limit": 100,
      "density": {
        "enable": false
      }
    },
    "color": {
      "value": "#d5bbfd"
    },
    "shape": {
      "type": "circle"
    },
    "opacity": {
      "value": 0.5,
      "random": true
    },
    "size": {
      "value": 2
    },
    "links": {
      "enable": true,
      "distance": 40,
      "color": "#d5bbfd",
      "opacity": 0.5,
      "width": 1,
      "triangles": {
        "enable": false
      }
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": false,
      "straight": false,
      "outModes": {
        "default": "bounce"
      },
      "attract": {
        "enable": false
      }
    }
  },
  "polygon": {
    "draw": {
      "enable": true,
      "stroke": {
        "color": "#ffffff",
        "width": 0.5,
        "opacity": 0.1
      }
    },
    "enable": true,
    "move": {
      "radius": 10
    },
    "url": "/brain.svg",
    "scale": 0.5,
    "type": "inline",
    "inline": {
      "arrangement": "random-point"
    },
    "position": {
      "x": 50,
      "y": 50
    }
  },
  "background": {
    "color": "transparent",
    "image": "",
    "position": "10% 10%",
    "repeat": "no-repeat",
    "size": "contain"
  }
}),
    []
  );

  if (!init) return null;

  return (
    <div className="z-10 ">
    <Particles id="tsparticles" particlesLoaded={particlesLoaded} options={options} />

    </div>
  );
};

export default ParticlesPage;
