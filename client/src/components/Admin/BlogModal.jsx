import React, { useState, useEffect } from 'react';
import api from '../../api';
import { X, Camera } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';

const BlogModal = ({ blog, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    featured_image: '',
    content: ''
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        id: blog.id,
        title: blog.title || '',
        featured_image: blog.featured_image || '',
        content: blog.content || ''
      });
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [blog, onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/save_blog', formData);
      onSave();
    } catch (error) {
      alert("Failed to save blog");
    }
  };

  return (
    <div className="glass-overlay" style={{ 
      position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000,
      padding: '20px'
    }}>
      <div className="glass-modal" style={{ 
        width: '100%', maxWidth: '1000px', maxHeight: '95vh', overflowY: 'auto', position: 'relative',
        display: 'flex', flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{ 
          padding: '30px 40px', borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'sticky', top: 0, background: 'rgba(10,10,12,0.8)', backdropFilter: 'blur(20px)', zIndex: 10
        }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: '4px' }}>
              {blog ? 'Edit Article' : 'Draft New Article'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 500 }}>
              Craft a compelling story for your audience.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="glass-button-secondary"
            style={{ width: '45px', height: '45px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ padding: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <SectionTitle title="Core Publication Details" />
              </div>
              
              <div style={{ gridColumn: 'span 2' }}>
                <Label text="Article Headline" />
                <input 
                  type="text" 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="glass-input"
                  style={{ width: '100%', padding: '16px', borderRadius: '15px', fontSize: '1.1rem', fontWeight: 600 }}
                  placeholder="Enter a captivating title..."
                  required 
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <Label text="Visual Masterpiece (Featured Image)" />
                <ImageUpload 
                  url={formData.featured_image} 
                  onUpload={(url) => setFormData({ ...formData, featured_image: url })} 
                />
              </div>
            </div>

            <div style={{ marginTop: '10px' }}>
              <SectionTitle title="Story Canvas" />
              <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', marginTop: '20px' }}>
                <Editor
                  tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.4.1/tinymce.min.js"
                  value={formData.content}
                  onEditorChange={(content) => setFormData({ ...formData, content })}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: ['advlist', 'autolink', 'lists', 'link', 'image', 'code', 'help', 'wordcount', 'emoticons', 'codesample', 'media', 'table'],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table emoticons codesample | removeformat | fullscreen preview code',
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    toolbar_mode: 'wrap'
                  }}
                />
              </div>
            </div>

          </div>

          <div className="glass-divider" style={{ margin: '40px 0' }} />

          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              type="button" 
              onClick={onClose}
              className="glass-button-secondary"
              style={{ flex: 1, padding: '18px', borderRadius: '18px', fontWeight: 700, fontSize: '1rem' }}
            >
              Discard Draft
            </button>
            <button 
              type="submit" 
              style={{ 
                flex: 2, padding: '18px', borderRadius: '18px', background: 'var(--accent-main)', 
                color: 'white', border: 'none', cursor: 'pointer', fontWeight: 900, fontSize: '1.1rem',
                boxShadow: '0 10px 30px rgba(229, 9, 20, 0.3)'
              }}
            >
              Publish Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---
const SectionTitle = ({ title }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
    <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-main)', textTransform: 'uppercase', letterSpacing: '2px', whiteSpace: 'nowrap' }}>{title}</span>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(229,9,20,0.3), transparent)' }} />
  </div>
);

const Label = ({ text, icon }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '0.85rem', fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
    {icon} {text}
  </label>
);

const ImageUpload = ({ url, onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  return (
    <div style={{ 
      height: '300px', borderRadius: '24px', border: '2px dashed rgba(255,255,255,0.1)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(255,255,255,0.02)', overflow: 'hidden', position: 'relative',
      transition: '0.3s'
    }}>
      {url ? (
        <>
          <img src={url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: 0, transition: '0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e=>e.currentTarget.style.opacity=1} onMouseOut={e=>e.currentTarget.style.opacity=0}>
            <button type="button" onClick={() => document.getElementById(`file-blog`).click()} className="glass-button-secondary" style={{ padding: '12px 25px', borderRadius: '12px' }}>Replace Image</button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', pointerEvents: 'none' }}>
          <div style={{ width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}>
            <Camera size={28} />
          </div>
          <p style={{ fontSize: '1rem', fontWeight: 700, color: 'white', marginBottom: '5px' }}>{isUploading ? 'Uploading Art...' : 'Upload Featured Image'}</p>
          <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Ideal size: 1200x630 (PNG, JPG, WebP)</p>
        </div>
      )}
      <input 
        type="file" 
        id={`file-blog`}
        hidden 
        accept="image/*" 
        onChange={async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          setIsUploading(true);
          const uploadData = new FormData();
          uploadData.append('image', file);
          try {
            const res = await api.post('/admin/upload_image', uploadData);
            onUpload(res.data.imageUrl);
          } catch (err) { alert("Upload failed"); }
          finally { setIsUploading(false); }
        }}
      />
      {!url && !isUploading && <div onClick={() => document.getElementById(`file-blog`).click()} style={{ position: 'absolute', inset: 0, cursor: 'pointer' }} />}
    </div>
  );
};

export default BlogModal;
