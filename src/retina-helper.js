// ==========================================================================
// Retina Display Image Handling Module
// ==========================================================================

/**
 * Image helper for serving optimized images for Retina and high-DPI displays
 * Based on Apple's recommendations for high-DPI web content
 */
export class RetinaImageHandler {
  constructor() {
    this.isRetina = this._detectRetinaDisplay();
    this.pixelRatio = window.devicePixelRatio || 1;
  }

  /**
   * Detect if the device has a Retina display
   * @returns {boolean} true if device has high-DPI display
   */
  _detectRetinaDisplay() {
    return (
      window.devicePixelRatio > 1 || 
      (window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi)").matches)
    );
  }

  /**
   * Load an appropriate image source based on device pixel ratio
   * @param {string} imagePath - Base path for image
   * @param {Object} options - Options for image loading
   * @returns {string} - Path to appropriate image
   */
  getOptimizedImagePath(imagePath, options = {}) {
    const defaults = {
      retinaVersion: true,
      webpSupport: true,
      avifSupport: false,
      sizes: ['1x', '2x', '3x']
    };
    
    const config = {...defaults, ...options};
    
    if (!this.isRetina || !config.retinaVersion) {
      return imagePath;
    }
    
    // Extract file information
    const lastDot = imagePath.lastIndexOf('.');
    const basePath = imagePath.substring(0, lastDot);
    const extension = imagePath.substring(lastDot + 1);
    
    // Choose appropriate suffix based on pixel ratio
    let pixelSuffix = '';
    if (this.pixelRatio >= 3 && config.sizes.includes('3x')) {
      pixelSuffix = '@3x';
    } else if (this.pixelRatio >= 2 && config.sizes.includes('2x')) {
      pixelSuffix = '@2x';
    } else if (config.sizes.includes('1x')) {
      pixelSuffix = '';
    }
    
    // Choose appropriate format
    let chosenExtension = extension;
    if (config.avifSupport && this._isAvifSupported()) {
      chosenExtension = 'avif';
    } else if (config.webpSupport && this._isWebPSupported()) {
      chosenExtension = 'webp';
    }
    
    return `${basePath}${pixelSuffix}.${chosenExtension}`;
  }
  
  /**
   * Generate a full srcset attribute for responsive images
   * @param {string} imagePath - Base path for image
   * @param {Object} options - Options for srcset generation
   * @returns {string} - Complete srcset attribute value
   */
  generateSrcset(imagePath, options = {}) {
    const defaults = {
      densities: [1, 2, 3],
      formats: ['original', 'webp'],
      sizes: [320, 640, 960, 1280, 1920]
    };
    
    const config = {...defaults, ...options};
    const lastDot = imagePath.lastIndexOf('.');
    const basePath = imagePath.substring(0, lastDot);
    const extension = imagePath.substring(lastDot + 1);
    
    const srcsetEntries = [];
    
    // For each format (original extension and possibly webp/avif)
    config.formats.forEach(format => {
      const ext = format === 'original' ? extension : format;
      
      // Generate entries for each pixel density
      config.densities.forEach(density => {
        if (density === 1) {
          srcsetEntries.push(`${basePath}.${ext} 1x`);
        } else {
          srcsetEntries.push(`${basePath}@${density}x.${ext} ${density}x`);
        }
      });
      
      // Generate entries for each size
      config.sizes.forEach(size => {
        srcsetEntries.push(`${basePath}-${size}w.${ext} ${size}w`);
      });
    });
    
    return srcsetEntries.join(', ');
  }
  
  /**
   * Check if the browser supports WebP format
   * @returns {boolean} - Whether WebP is supported
   */
  _isWebPSupported() {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
  }
  
  /**
   * Check if the browser supports AVIF format
   * @returns {boolean} - Whether AVIF is supported
   */
  _isAvifSupported() {
    const testImages = {
      avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK'
    };
    
    return fetch(testImages.avif)
      .then(response => response.blob())
      .then(blob => {
        return blob.type === 'image/avif';
      })
      .catch(() => false);
  }
  
  /**
   * Generate an image element with proper srcset and sizes
   * @param {string} src - Base image source
   * @param {string} alt - Alt text
   * @param {Object} options - Additional options
   * @returns {HTMLElement} - Fully configured img element
   */
  createOptimizedImageElement(src, alt, options = {}) {
    const img = document.createElement('img');
    img.src = this.getOptimizedImagePath(src, options);
    img.alt = alt || '';
    
    if (options.srcset !== false) {
      img.srcset = this.generateSrcset(src, options);
    }
    
    if (options.sizes) {
      img.sizes = options.sizes;
    }
    
    if (options.className) {
      img.className = options.className;
    }
    
    if (options.loading) {
      img.loading = options.loading;
    } else {
      img.loading = 'lazy';
    }
    
    return img;
  }
}

// Export singleton instance
export const retinaHelper = new RetinaImageHandler();
