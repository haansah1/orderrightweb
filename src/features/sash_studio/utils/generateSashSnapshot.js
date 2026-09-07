/**
 * Helper to generate a rendered visual PNG snapshot of the customized graduation sash
 * Returns a Data URL (data:image/png;base64,...) ready to be used as `item.image` in the cart.
 */

export async function generateSashSnapshot({ selectedUniversity, leftName, rightVerse, rightProg }) {
  return new Promise((resolve) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 560;
      const ctx = canvas.getContext('2d');

      // Dark background container
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load background sash image
      const bgImg = new Image();
      bgImg.crossOrigin = 'Anonymous';
      bgImg.src = '/media/sash  no-border.png';

      bgImg.onload = () => {
        try {
          ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
        } catch (e) {
          drawFallbackStole();
        }
        drawLogoAndText();
      };

      bgImg.onerror = () => {
        drawFallbackStole();
        drawLogoAndText();
      };

      function drawFallbackStole() {
        ctx.fillStyle = '#18181b';
        ctx.fillRect(50, 40, 130, 480);
        ctx.fillRect(220, 40, 130, 480);

        const drawTrim = (x) => {
          ctx.fillStyle = '#dc2626';
          ctx.fillRect(x, 40, 130, 8);
          ctx.fillStyle = '#eab308';
          ctx.fillRect(x, 48, 130, 8);
          ctx.fillStyle = '#16a34a';
          ctx.fillRect(x, 56, 130, 8);
        };
        drawTrim(50);
        drawTrim(220);
      }

      function drawLogoAndText() {
        const logoUrl = selectedUniversity?.logoUrl || '/media/university_logos/UG logo.png';
        const logoImg = new Image();
        logoImg.crossOrigin = 'Anonymous';
        logoImg.src = logoUrl;

        logoImg.onload = () => {
          try {
            ctx.drawImage(logoImg, 80, 140, 70, 70);
          } catch (e) {
            console.warn('Draw logo failed:', e);
          }
          drawEmbroideryText();
        };

        logoImg.onerror = () => {
          drawEmbroideryText();
        };
      }

      function drawEmbroideryText() {
        try {
          ctx.fillStyle = '#FED65B';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          ctx.shadowBlur = 4;
          ctx.textAlign = 'center';

          if (leftName && leftName !== 'N/A') {
            ctx.save();
            ctx.font = 'bold 15px "Montserrat", sans-serif';
            const nameWords = String(leftName).split(' ');
            let y = 320;
            nameWords.forEach((word) => {
              ctx.fillText(word, 115, y);
              y += 20;
            });
            ctx.restore();
          }

          if (rightVerse && rightVerse !== 'N/A') {
            ctx.save();
            ctx.fillStyle = '#FED65B';
            ctx.font = 'bold 12px "Montserrat", sans-serif';
            const vWords = String(rightVerse).split(' ');
            let y = 150;
            vWords.forEach((word) => {
              ctx.fillText(word, 285, y);
              y += 18;
            });
            ctx.restore();
          }

          if (rightProg && rightProg !== 'N/A') {
            ctx.save();
            ctx.fillStyle = '#FED65B';
            ctx.font = 'bold 13px "Montserrat", sans-serif';
            const pWords = String(rightProg).split(' ');
            let y = 320;
            pWords.forEach((word) => {
              ctx.fillText(word, 285, y);
              y += 20;
            });
            ctx.restore();
          }
        } catch (e) {
          console.warn('Text drawing notice:', e);
        }

        try {
          resolve(canvas.toDataURL('image/png'));
        } catch (err) {
          console.warn('Canvas export fallback:', err);
          resolve('/media/sash_sample_1.png');
        }
      }
    } catch (err) {
      console.error('Error generating sash snapshot:', err);
      resolve('/media/sash_sample_1.png');
    }
  });
}
