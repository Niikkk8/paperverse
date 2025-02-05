import { Play, Upload } from "lucide-react";
import { useEffect, useRef } from "react";

const HeroSection = () => (
    <div className="bg-slate-900 text-white py-32 relative overflow-hidden">
        <ParticleBackground />
        <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-8">
                    Transform Research into
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {' '}Interactive Content
                    </span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
                    Convert complex academic papers into engaging presentations, podcasts,
                    videos, and graphical abstracts using advanced AI technology
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:bg-blue-700 transition-colors group">
                        <Upload className="w-5 h-5 mr-2 group-hover:translate-y-[-2px] transition-transform" />
                        Start Converting
                    </button>
                    <button className="bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center hover:bg-slate-700 border border-slate-600 transition-colors group">
                        <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                        Watch Demo
                    </button>
                </div>
            </div>
        </div>
    </div>
);
const ParticleBackground = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        
        const initCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            particles = Array(150).fill().map(() => new Particle(canvas));
        };
        
        class Particle {
            constructor(canvas) {
                this.canvas = canvas;
                this.reset();
            }
            
            reset() {
                this.x = Math.random() * this.canvas.width;
                this.y = Math.random() * this.canvas.height;
                this.z = Math.random() * 2000 + 1000;
                this.size = Math.random() * 2 + 1;
                this.speed = Math.random() * 2 + 0.5;
                this.opacity = Math.random() * 0.6 + 0.4;
                this.color = `hsl(${Math.random() * 60 + 200}, 70%, 60%)`;
            }
            
            update() {
                this.z -= this.speed;
                this.opacity = Math.min(this.z / 1000, 1);
                if (this.z <= 100) this.reset();
            }
            
            draw(ctx) {
                const perspective = Math.max(1000 - this.z, 1);
                const scale = 1000 / perspective;
                const x = ((this.x - this.canvas.width / 2) * scale) + this.canvas.width / 2;
                const y = ((this.y - this.canvas.height / 2) * scale) + this.canvas.height / 2;
                const radius = Math.max(this.size * scale, 0.1);
                
                if (x >= 0 && x <= this.canvas.width && y >= 0 && y <= this.canvas.height) {
                    ctx.beginPath();
                    ctx.fillStyle = `${this.color}${Math.floor(this.opacity * 255).toString(16).padStart(2, '0')}`;
                    ctx.arc(x, y, radius, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
        
        const animate = () => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        
        window.addEventListener('resize', initCanvas);
        initCanvas();
        animate();
        
        return () => {
            window.removeEventListener('resize', initCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);
    
    return (
        <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
        style={{ pointerEvents: 'none' }}
        />
    );
};

export default HeroSection;