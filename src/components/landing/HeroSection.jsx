import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import IMAGES from "@/lib/images";
import * as THREE from "three";
import { ChevronDown } from "lucide-react";

function WebGLBackground({ containerRef }) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let active = true;
    const scene = new THREE.Scene();
    const w = window.innerWidth;
    const h = window.innerHeight;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const loader = new THREE.TextureLoader();

    const urls = [IMAGES.home, IMAGES.matungaAerial, IMAGES.temple, IMAGES.cityDrone, IMAGES.atalSetu];
    const textures = urls.map((url) => {
      const t = loader.load(url);
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      return t;
    });

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uTexture1: { value: textures[0] },
        uTexture2: { value: textures[1] },
        uTexture3: { value: textures[2] },
        uTexture4: { value: textures[3] },
        uTexture5: { value: textures[4] },
        uRes: { value: new THREE.Vector2(w, h) },
        uTexRes: { value: new THREE.Vector2(1920, 1080) },
      },
      vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`,
      fragmentShader: `
        uniform float uTime, uProgress;
        uniform sampler2D uTexture1, uTexture2, uTexture3, uTexture4, uTexture5;
        uniform vec2 uRes, uTexRes;
        varying vec2 vUv;
        vec2 cover(vec2 uv,vec2 pr,vec2 tr){
          vec2 r=vec2(min((pr.x/pr.y)/(tr.x/tr.y),1.0),min((pr.y/pr.x)/(tr.y/tr.x),1.0));
          return vec2(uv.x*r.x+(1.0-r.x)*0.5,uv.y*r.y+(1.0-r.y)*0.5);
        }
        float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
        float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);
          return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
        void main(){
          vec2 uv=cover(vUv,uRes,uTexRes);
          float n=noise(vUv*8.0+uTime*0.2)*0.08;
          float p=mod(uProgress,5.0);
          vec4 c;
          if(p<1.0){float l=smoothstep(0.0,1.0,p);vec2 d=uv+n*l;c=mix(texture2D(uTexture1,d),texture2D(uTexture2,d),l);}
          else if(p<2.0){float l=smoothstep(1.0,2.0,p);vec2 d=uv+n*l;c=mix(texture2D(uTexture2,d),texture2D(uTexture3,d),l);}
          else if(p<3.0){float l=smoothstep(2.0,3.0,p);vec2 d=uv+n*l;c=mix(texture2D(uTexture3,d),texture2D(uTexture4,d),l);}
          else if(p<4.0){float l=smoothstep(3.0,4.0,p);vec2 d=uv+n*l;c=mix(texture2D(uTexture4,d),texture2D(uTexture5,d),l);}
          else{float l=smoothstep(4.0,5.0,p);vec2 d=uv+n*l;c=mix(texture2D(uTexture5,d),texture2D(uTexture1,d),l);}
          gl_FragColor=c;
        }
      `,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    let progressVal = 0;
    const render = () => {
      if (!active) return;
      material.uniforms.uTime.value += 0.01;
      progressVal += 0.004;
      material.uniforms.uProgress.value = progressVal;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      renderer.setSize(nw, nh);
      material.uniforms.uRes.value.set(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      active = false;
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}

export default function HeroSection() {
  const webglRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = window.innerWidth >= 1024 ? 120 : 102;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollToStory = () => {
    scrollToSection("story");
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end items-start text-left overflow-hidden pt-32 md:pt-40">
      {/* WebGL canvas container */}
      <div ref={webglRef} className="absolute inset-0 z-0 pointer-events-none">
        <WebGLBackground containerRef={webglRef} />
      </div>

      {/* Hero Copy */}
      <motion.div
        className="relative z-[5] max-w-[1280px] px-[5vw] pb-[8vh] md:pb-[12vh] w-full will-change-transform"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      >
        <motion.p
          className="text-xs tracking-[0.36em] uppercase text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          Legacy-rooted. Future-facing. Central Mumbai.
        </motion.p>

        <h1 className="font-heading text-white text-5xl sm:text-7xl md:text-8xl lg:text-[8.4rem] leading-[0.9] tracking-tight mb-6">
          Greater<br />Matunga<br />District
        </h1>

        <p className="font-body text-xs sm:text-sm tracking-[0.14em] uppercase text-white/80 mt-5 mb-2">
          The rise of a new urban landmark.
        </p>

        <div className="flex flex-col lg:flex-row lg:items-end gap-10 mt-6 lg:mt-2">
          <p className="font-body text-base text-white/70 leading-relaxed max-w-md">
            A cinematic real-estate destination where heritage, lifestyle, and growth come together in one elevated address.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToStory}
              className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-primary text-primary-foreground text-xs tracking-[0.16em] uppercase shadow-[0_18px_40px_rgba(168,109,43,0.22)] hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1"
            >
              Enter The District
            </button>
            <button
              onClick={() => scrollToSection("location")}
              className="inline-flex items-center justify-center h-14 px-8 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white text-xs tracking-[0.16em] uppercase hover:bg-white/10 hover:border-white/40 transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Connectivity
            </button>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToStory}
        className="absolute right-[5vw] bottom-[8vh] z-[6] hidden md:flex items-center gap-3 text-white/50 text-xs tracking-[0.22em] uppercase"
      >
        <span className="w-10 h-px bg-current" />
        <span>Scroll To Discover</span>
        <ChevronDown className="w-3 h-3 animate-bounce" />
      </button>
    </section>
  );
}
