import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Copy, Check, Youtube, ArrowLeft, ArrowRight, Crown, Instagram, Heart, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';
import api from '../api';
import YouTubeModal from '../components/Modals/YouTubeModal';
import SEOMetadata from '../components/SEO/SEOMetadata';
import AdSenseUnit from '../components/Ads/AdSenseUnit';

const PromptDetailPage = ({ user, adsSettings }) => {
  const { key } = useParams();
  const [prompt, setPrompt] = useState(null);
  const [showAuthHint, setShowAuthHint] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [sliderValue, setSliderValue] = useState(50);
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPrompt();
    fetchSuggestions();
  }, [key]);

  const fetchPrompt = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/prompt/${key}`);
      setPrompt(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching prompt:", err);
      setError("Failed to load prompt details");
      setLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await api.get('/get_data');
      if (response.data && response.data.prompts) {
        setSuggestedPrompts(response.data.prompts.filter(p => p.key !== key).slice(0, 6));
      }
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const checkAutoUnlock = async (value) => {
    setPin(value);
    setShowError(false);
    const targetPass = String(prompt?.password || '1234').trim();
    const inputPass = String(value || '').trim();
    
    if (inputPass === targetPass) {
      setIsUnlocked(true);
      triggerConfetti();
      try {
        await api.post('/record_unlock', { key: prompt.key }); // Record as unlock
      } catch (err) {
        console.error("Failed to record correct attempt:", err);
      }
    } else if (inputPass.length >= targetPass.length) {
      setShowError(true);
      setTimeout(() => {
        setPin('');
        setShowError(false);
      }, 800);
    }
  };

  const contentRef = React.useRef(null);

  useEffect(() => {
    if (isUnlocked && contentRef.current) {
      setTimeout(() => {
        const promptBox = document.getElementById('box-detail');
        if (promptBox) {
          promptBox.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 600);
    }
  }, [isUnlocked]);

  const triggerConfetti = () => {
    const box = document.getElementById(`box-detail`);
    if (box) {
      const rect = box.getBoundingClientRect();
      const originX = (rect.left + (rect.width / 2)) / window.innerWidth;
      const originY = (rect.top + (rect.height / 2)) / window.innerHeight;
      setTimeout(() => {
        const freshRect = box.getBoundingClientRect();
        const originX = (freshRect.left + (freshRect.width / 2)) / window.innerWidth;
        const originY = (freshRect.top + (freshRect.height / 2)) / window.innerHeight;

        const count = 200;
        const defaults = {
          origin: { x: originX, y: originY },
          colors: ['#e50914', '#FFD700'],
          zIndex: 9999
        };

        function fire(particleRatio, opts) {
          confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio)
          });
        }

        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });
      }, 50);
    }
  };



  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.promptText);
      await api.post('/record_copy', { key: prompt.key });
      setIsCopied(true);
      
      // Relock smoothly with a very short delay to instantly respond to the copy
      setTimeout(() => {
        setIsUnlocked(false);
      }, 200);
      
      setTimeout(() => {
        setIsCopied(false);
        setPin(''); // Reset PIN
      }, 800);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (loading) return (
    <div style={{ padding: '150px 20px', textAlign: 'center', color: 'var(--text-secondary)', background: 'var(--bg-color)', minHeight: '100vh' }}>
      <SEOMetadata title="Loading Prompt... | PromptKing" />
      <div className="loader"></div>
      <p style={{ marginTop: '20px' }}>Analyzing prompt architecture...</p>
    </div>
  );

  if (error || !prompt) return (
    <div style={{ padding: '150px 20px', textAlign: 'center', background: 'var(--bg-color)', minHeight: '100vh' }}>
      <SEOMetadata title="Prompt Not Found | PromptKing" />
      <h2 style={{ color: 'var(--accent-main)', marginBottom: '20px' }}>{error || "Prompt not found"}</h2>
      <Link to="/" style={{ padding: '12px 30px', background: 'white', color: 'black', borderRadius: '50px', fontWeight: 700 }}>Back to Home</Link>
    </div>
  );

  const aiType = prompt.aiType || '';
  const brandColor = aiType.toLowerCase().includes('chatgpt') ? '#10a37f' :
                    aiType.toLowerCase().includes('gemini') ? '#4285f4' :
                    aiType.toLowerCase().includes('midjourney') ? '#a855f7' : 
                    'rgba(255,255,255,0.4)';
  const badgeClass = aiType.toLowerCase().includes('chatgpt') ? 'chatgpt' : 
                   aiType.toLowerCase().includes('gemini') ? 'gemini' : 
                   aiType.toLowerCase().includes('midjourney') ? 'midjourney' : '';

  const promptSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": prompt.title,
    "description": prompt.description,
    "image": prompt.img_after || prompt.img_before,
    "author": {
      "@type": "Organization",
      "name": "PromptKing"
    }
  };

  return (
    <div className="detail-page-wrapper" style={{ background: 'var(--surface-0)', minHeight: '100vh', color: 'white' }}>
      <SEOMetadata 
        title={`${prompt.title} - AI Prompt | PromptKing`}
        description={prompt.description?.slice(0, 160)}
        image={prompt.img_after || prompt.img_before}
        schema={promptSchema}
      />
      <div className="container" style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Back Button */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '30px', fontWeight: 600, textDecoration: 'none' }} className="back-link">
          <ArrowLeft size={18} /> Back to Explorer
        </Link>

        {/* 2-Column Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '40px' }} className="detail-layout">
          
          {/* Main Content (Left) */}
          <div ref={contentRef} className="detail-main glass-panel" style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '32px',
            padding: '40px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              marginBottom: '40px'
            }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', marginBottom: '40px', position: 'relative' }}>
                {prompt.isImageSlider ? (
                  <div className="slider-container" style={{ position: 'relative', aspectRatio: (prompt.image_ratio || prompt.imageRatio || '16 / 9').replace(/\s+/g, ' ').trim(), width: '100%' }}>
                    <img src={prompt.imgAfter} alt="After" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    <img 
                      src={prompt.imgBefore} 
                      alt="Before" 
                      style={{ 
                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover',
                        clipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
                        WebkitClipPath: `inset(0 ${100 - sliderValue}% 0 0)`,
                        zIndex: 2
                      }} 
                    />
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderValue}%`, width: '3px', background: 'white', zIndex: 3, transform: 'translateX(-50%)' }}>
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', color: 'black', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}>◀ ▶</div>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={sliderValue} 
                      onChange={handleSliderChange}
                      style={{ position: 'absolute', inset: 0, zIndex: 10, opacity: 0, cursor: 'ew-resize', width: '100%', height: '100%' }}
                    />
                  </div>
                ) : (prompt.imgAfter || prompt.imgBefore) && (
                  <div style={{ width: '100%', aspectRatio: (prompt.image_ratio || prompt.imageRatio || '16 / 9').replace(/\s+/g, ' ').trim(), background: '#111', position: 'relative' }}>
                    <img src={prompt.imgAfter || prompt.imgBefore} alt={prompt.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
                
                
                {/* Premium Icon (Detail) */}
                {prompt?.isPremium && (
                  <div style={{ position: 'absolute', top: '30px', right: '30px', zIndex: 100 }}>
                    <div style={{
                      background: 'rgba(0,0,0,0.3)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                    }}>
                      <Crown size={24} fill="#FFD700" color="#FFD700" />
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{prompt.copyCount || 0} Copies Created</span>
              </div>

              <h1 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '25px', lineHeight: 1.2, color: 'rgba(255, 255, 255, 0.9)' }}>{prompt.title}</h1>
            </div>

            <div id="box-detail" className={`prompt-area ${isUnlocked ? 'unlocked' : ''}`} style={{
              background: 'rgba(15, 15, 20, 0.4)', 
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '30px', 
              position: 'relative', 
              overflow: 'hidden',
              display: 'flex', 
              flexDirection: 'column', 
              marginBottom: '30px', 
              border: isUnlocked ? (prompt.isPremium ? '2px solid #FFD700' : '2px solid var(--accent-main)') : '1px solid rgba(255,255,255,0.08)',
              boxShadow: isUnlocked ? (prompt.isPremium ? '0 0 40px rgba(255, 215, 0, 0.25)' : '0 0 40px rgba(229, 9, 20, 0.3)') : 'none',
              transform: isUnlocked ? 'scale(1.02)' : 'scale(1)',
              minHeight: isUnlocked ? '180px' : '160px',
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              {/* macOS Style Header */}
              <div style={{ background: 'transparent', padding: '12px 15px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FF5F56' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#FFBD2E' }}></div>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27C93F' }}></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className={`badge ${badgeClass}`} style={{ 
                    fontSize: '0.7rem', 
                    padding: '4px 12px',
                    borderRadius: '8px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${brandColor || 'rgba(255,255,255,0.2)'}`,
                    color: brandColor || 'white',
                    letterSpacing: '0.5px'
                  }}>{prompt.aiType || 'AI'}</span>
                </div>
              </div>
              
              <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ 
                  position: 'absolute', inset: 0, padding: '20px 20px 60px 20px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#eee', lineHeight: 1.7,
                  filter: (isUnlocked) ? 'none' : 'blur(10px)', 
                  WebkitFilter: (isUnlocked) ? 'none' : 'blur(10px)',
                  userSelect: (isUnlocked) ? 'text' : 'none', 
                  overflowY: (isUnlocked) ? 'auto' : 'hidden'
                }}>
                  {prompt.promptText}
                </div>

                {isUnlocked && (
                  <button 
                    onClick={handleCopy}
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      background: isCopied ? '#27C93F' : 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'white',
                      padding: '8px 15px',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      backdropFilter: 'blur(10px)',
                      zIndex: 20,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isCopied ? <Check size={14} /> : <Copy size={14} />}
                    {isCopied ? 'Copy' : 'Copy'}
                  </button>
                )}

                {!isUnlocked && (
                  <div style={{ 
                    position: 'absolute', inset: 0, background: 'rgba(10, 10, 12, 0.85)', 
                    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '25px 15px', zIndex: 10, gap: '15px'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      width: '100%'
                    }}>
                      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <input 
                          type="password" 
                          placeholder="••••" 
                          value={pin}
                          onChange={(e) => checkAutoUnlock(e.target.value)}
                          style={{ 
                            width: '160px',
                            height: '50px',
                            borderRadius: '100px',
                            border: showError ? '2px solid #ff4444' : '1px solid rgba(255,255,255,0.2)',
                            background: 'rgba(255,255,255,0.08)',
                            color: 'white', 
                            textAlign: 'center', 
                            outline: 'none', 
                            letterSpacing: '10px', 
                            fontSize: '1.4rem', 
                            transition: 'all 0.3s ease',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                          }} 
                        />
                      </form>
                    </div>

                    {showError && <p style={{ color: '#ff4444', fontSize: '0.75rem', marginTop: '8px', fontWeight: 600 }}>Incorrect PIN</p>}
                    
                    {prompt.igLink && (
                      <button 
                        onClick={() => setShowVideoModal(true)}
                        style={{ 
                          background: 'transparent', 
                          fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '8px', 
                          textDecoration: 'none', border: 'none', cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.color = 'white'; }}
                        onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                      >
                        {prompt.igLink.includes('instagram') ? (
                          <Instagram size={16} color="currentColor" />
                        ) : (
                          <Youtube size={16} color="currentColor" />
                        )}
                        Get PIN from {prompt.igLink.includes('instagram') ? 'Reel' : 'Short'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <YouTubeModal 
              isOpen={showVideoModal} 
              onClose={() => setShowVideoModal(false)} 
              videoUrl={prompt.igLink} 
            />

            {(!isUnlocked && !prompt.isPremium) && (
              <button 
                onClick={handleCopy}
                style={{
                  width: '100%', background: isCopied ? 'var(--success)' : 'white', color: isCopied ? 'white' : 'black',
                  border: 'none', padding: '16px', borderRadius: '50px', fontWeight: 800, fontSize: '1.1rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: '0.4s',
                  boxShadow: isCopied ? '0 0 30px rgba(39, 201, 63, 0.3)' : '0 10px 20px rgba(0,0,0,0.3)',
                  marginBottom: '20px'
                }}
              >
                {isCopied ? <><Check size={22} /> Copied to Clipboard!</> : <><Copy size={22} /> Copy Full Prompt</>}
              </button>
            )}

            {/* In-Content Ad Placement */}
            {adsSettings?.adsense_enabled === '1' && adsSettings?.adsense_slot_detail && (
              <AdSenseUnit client={adsSettings.adsense_client_id} slot={adsSettings.adsense_slot_detail} />
            )}

            <div style={{
              transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <div 
                className="blog-content" 
                style={{ color: '#ccc', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '40px' }}
                dangerouslySetInnerHTML={{ __html: prompt.description || '' }}
              />
            </div>
          </div>

          {/* Sidebar (Right) */}
          <aside className="detail-sidebar">
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.02)', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              borderRadius: '28px', 
              padding: '28px', 
              position: 'sticky', 
              top: '110px',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <div style={{ width: '3px', height: '20px', background: 'var(--accent-main)', borderRadius: '2px' }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.3px', margin: 0 }}>
                  Related Creations
                </h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {suggestedPrompts.map(s => (
                  <Link 
                    key={s.key} 
                    to={`/prompt/${s.slug || s.prompt_key || s.key}`} 
                    style={{ 
                      display: 'flex', 
                      gap: '14px', 
                      textDecoration: 'none', 
                      color: 'inherit',
                      padding: '12px',
                      borderRadius: '18px',
                      background: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(255,255,255,0.03)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                    }} 
                    className="suggested-card-item"
                  >
                    <div style={{ 
                      width: '85px', 
                      height: '65px', 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      flexShrink: 0, 
                      background: '#111',
                      border: '1px solid rgba(255,255,255,0.05)'
                    }}>
                      <img src={s.imgAfter} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.5s' }} className="suggestion-img" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '4px' }}>
                      <h4 style={{ 
                        fontSize: '0.9rem', 
                        fontWeight: 700, 
                        lineHeight: 1.3, 
                        display: '-webkit-box', 
                        WebkitLineClamp: 2, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden',
                        color: 'rgba(255,255,255,0.9)'
                      }}>{s.title}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ 
                          fontSize: '0.65rem', 
                          color: s.aiType?.toLowerCase().includes('chatgpt') ? '#10a37f' : (s.aiType?.toLowerCase().includes('gemini') ? '#4285f4' : 'var(--accent-main)'), 
                          fontWeight: 800, 
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>{s.aiType}</span>
                        <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Pro Choice</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div style={{ 
                marginTop: '28px', 
                padding: '24px', 
                background: 'linear-gradient(135deg, rgba(229, 9, 20, 0.1), rgba(229, 9, 20, 0.02))', 
                borderRadius: '20px', 
                border: '1px solid rgba(229, 9, 20, 0.15)',
                textAlign: 'center'
              }}>
                <Crown size={28} color="var(--accent-main)" style={{ marginBottom: '12px', opacity: 0.8 }} />
                <h5 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '6px' }}>King Community</h5>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: '16px' }}>
                  Unlock exclusive masterclasses and premium prompt engineering strategies.
                </p>
                <button style={{ 
                  width: '100%',
                  background: 'var(--accent-main)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '10px', 
                  borderRadius: '12px', 
                  fontSize: '0.8rem', 
                  fontWeight: 800, 
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(229, 9, 20, 0.2)'
                }}>Coming Soon</button>
              </div>

              {/* Sidebar Ad Placement */}
              {adsSettings?.adsense_enabled === '1' && adsSettings?.adsense_slot_sidebar && (
                <div style={{ marginTop: '20px' }}>
                  <AdSenseUnit client={adsSettings.adsense_client_id} slot={adsSettings.adsense_slot_sidebar} />
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

<style>{`
        .detail-page-wrapper { animation: fadeIn 0.6s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .back-link { transition: 0.3s; }
        .back-link:hover { color: white !important; transform: translateX(-5px); }
        .suggested-card-item:hover { 
          transform: translateY(-3px) translateX(4px); 
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(229, 9, 20, 0.2) !important;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .suggested-card-item:hover .suggestion-img { transform: scale(1.1); }
        .suggested-card-item:hover h4 { color: var(--accent-main) !important; }
        .chatgpt { color: #10a37f; background: rgba(16, 163, 127, 0.08) !important; border-color: rgba(16, 163, 127, 0.3) !important; }
        .gemini { color: #4285f4; background: rgba(66, 133, 244, 0.08) !important; border-color: rgba(66, 133, 244, 0.3) !important; }
        .midjourney { color: #a855f7; background: rgba(168, 85, 247, 0.08) !important; border-color: rgba(168, 85, 247, 0.3) !important; }
        .blog-content img { max-width: 100%; border-radius: 15px; margin: 20px 0; }
        .blog-content h2, .blog-content h3 { color: white; margin-top: 35px; margin-bottom: 20px; }
        @media (max-width: 1024px) {
          .detail-layout { grid-template-columns: 1fr !important; }
          .detail-sidebar { display: none; }
        }
        @media (max-width: 768px) {
          .detail-main { border-radius: 15px !important; padding: 15px !important; }
          .prompt-area { border-radius: 15px !important; }
        }
      `}</style>
    </div>
  );
};

export default PromptDetailPage;
