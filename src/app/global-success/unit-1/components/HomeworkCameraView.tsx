// src/app/global-success/unit-1/components/HomeworkCameraView.tsx
// UPDATED: 2025-01-27 - Added video recording and download functionality

import React, { useRef, useEffect, useState } from 'react';

interface HomeworkCameraViewProps {
  onClose: () => void;
}

export const HomeworkCameraView = ({ onClose }: HomeworkCameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 20, y: 20 });
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasRecording, setHasRecording] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Timer effect for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    let currentStream: MediaStream;
    const startCamera = async () => {
      try {
        // Start with video-only for better recording compatibility
        currentStream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: false // Disable audio to avoid recording conflicts
        });
        setStream(currentStream);
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      } catch (err) {
        console.error("Lỗi truy cập camera: ", err);
        alert("Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập trong trình duyệt.");
        onClose();
      }
    };
    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [onClose, isRecording]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = {
      x: e.clientX - position.current.x,
      y: e.clientY - position.current.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    position.current = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Check MediaRecorder support
  const isRecordingSupported = () => {
    return typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('video/webm');
  };

  // Recording functions - simplified for video-only
  const startRecording = () => {
    if (!stream) {
      console.log('No stream available');
      return;
    }
    
    // Debug stream info
    console.log('Stream info:', stream);
    console.log('Video tracks:', stream.getVideoTracks());
    console.log('Audio tracks:', stream.getAudioTracks());
    console.log('Stream active:', stream.active);
    
    const videoTracks = stream.getVideoTracks();
    
    if (videoTracks.length === 0) {
      alert('Không có video track. Vui lòng kiểm tra camera.');
      return;
    }
    
    console.log('Video track state:', videoTracks[0].readyState);
    console.log('Video track enabled:', videoTracks[0].enabled);
    
    if (!isRecordingSupported()) {
      alert('Trình duyệt của bạn không hỗ trợ ghi video. Vui lòng sử dụng Chrome, Firefox hoặc Edge phiên bản mới.');
      return;
    }
    
    try {
      recordedChunksRef.current = [];
      
      // Use basic WebM for video-only recording (proven to work)
      const options: MediaRecorderOptions = { mimeType: 'video/webm' };
      console.log('Using video-only WebM recording');
      
      const mediaRecorder = new MediaRecorder(stream, options);
      console.log('MediaRecorder created for video-only recording');
      
      mediaRecorder.ondataavailable = (event) => {
        console.log('Data available, size:', event.data.size, 'type:', event.data.type);
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
          console.log('Total chunks now:', recordedChunksRef.current.length);
        }
      };
      
      mediaRecorder.onstop = () => {
        console.log('Recording stopped, total chunks:', recordedChunksRef.current.length);
        if (recordedChunksRef.current.length > 0) {
          setHasRecording(true);
          console.log('Recording ready for download');
        } else {
          console.error('No data chunks collected during recording');
        }
      };
      
      mediaRecorder.onstart = () => {
        console.log('Recording started successfully');
      };
      
      mediaRecorder.onerror = (event: any) => {
        console.error('MediaRecorder error:', event);
        setIsRecording(false);
        alert('Lỗi khi ghi video: ' + (event.error?.message || 'Unknown error'));
      };
      
      mediaRecorderRef.current = mediaRecorder;
      
      // Start recording with 100ms timeslice (proven to work)
      mediaRecorder.start(100);
      console.log('MediaRecorder started with 100ms timeslice');
      
      setIsRecording(true);
      setRecordingTime(0);
    } catch (err) {
      console.error('Lỗi khi bắt đầu ghi: ', err);
      alert('Không thể bắt đầu ghi video. Vui lòng thử lại hoặc sử dụng trình duyệt khác.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      console.log('Stopping recording...');
      console.log('MediaRecorder state before stop:', mediaRecorderRef.current.state);
      
      // Request data before stopping
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.requestData();
        console.log('Requested final data chunk');
      }
      
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log('Stop command sent');
    }
  };

  const downloadRecording = () => {
    console.log('Download button clicked');
    console.log('Recorded chunks length:', recordedChunksRef.current.length);
    
    if (recordedChunksRef.current.length === 0) {
      console.log('No recorded chunks available');
      alert('Không có video để tải xuống. Vui lòng ghi video trước.');
      return;
    }
    
    try {
      console.log('Creating blob from chunks...');
      const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      console.log('Blob created, size:', blob.size, 'bytes');
      
      if (blob.size === 0) {
        console.log('Blob is empty');
        alert('Video trống. Vui lòng ghi lại.');
        return;
      }
      
      const url = URL.createObjectURL(blob);
      console.log('Object URL created:', url);
      
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `pronunciation-practice-${timestamp}.webm`;
      
      console.log('Download filename:', filename);
      
      a.href = url;
      a.download = filename;
      a.style.display = 'none';
      
      document.body.appendChild(a);
      console.log('Triggering download...');
      
      // Try multiple methods to trigger download
      try {
        a.click();
        console.log('Click method attempted');
      } catch (clickError) {
        console.log('Click failed, trying dispatchEvent');
        const event = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true,
        });
        a.dispatchEvent(event);
      }
      
      // Alternative method: open in new window if download fails
      setTimeout(() => {
        if (document.body.contains(a)) {
          console.log('Download may have failed, trying window.open');
          const newWindow = window.open(url, '_blank');
          if (newWindow) {
            newWindow.document.title = filename;
          }
        }
      }, 1000);
      
      // Clean up
      setTimeout(() => {
        if (document.body.contains(a)) {
          document.body.removeChild(a);
        }
        URL.revokeObjectURL(url);
        console.log('Download cleanup completed');
      }, 2000);
      
    } catch (error) {
      console.error('Download error:', error);
      alert('Lỗi khi tải video: ' + (error as any).message);
    }
  };

  const clearRecording = () => {
    console.log('Clearing recording');
    recordedChunksRef.current = [];
    setHasRecording(false);
    setRecordingTime(0);
  };

  // Test download function
  const testDownload = () => {
    console.log('Testing download with dummy data');
    try {
      // Create a small test blob
      const testData = new Uint8Array([0x1a, 0x45, 0xdf, 0xa3]); // WebM header start
      const testBlob = new Blob([testData], { type: 'video/webm' });
      
      const url = URL.createObjectURL(testBlob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      
      a.href = url;
      a.download = `test-download-${timestamp}.webm`;
      a.style.display = 'none';
      
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        console.log('Test download completed');
      }, 100);
      
    } catch (error) {
      console.error('Test download error:', error);
    }
  };

  // Debug function to check recording state
  const debugRecordingState = () => {
    console.log('=== RECORDING DEBUG INFO ===');
    console.log('isRecording:', isRecording);
    console.log('hasRecording:', hasRecording);
    console.log('recordingTime:', recordingTime);
    console.log('stream:', stream);
    console.log('mediaRecorderRef.current:', mediaRecorderRef.current);
    console.log('recordedChunksRef.current.length:', recordedChunksRef.current.length);
    console.log('recordedChunksRef.current:', recordedChunksRef.current);
    
    if (recordedChunksRef.current.length > 0) {
      const totalSize = recordedChunksRef.current.reduce((total, chunk) => total + chunk.size, 0);
      console.log('Total recorded data size:', totalSize, 'bytes');
    }
    
    // Check MediaRecorder support for different formats
    console.log('=== CODEC SUPPORT ===');
    const codecs = [
      'video/webm;codecs=vp9,opus',
      'video/webm;codecs=vp8,opus', 
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
      'video/mp4',
      'video/mp4;codecs=avc1',
      'video/mp4;codecs=h264'
    ];
    
    codecs.forEach(codec => {
      console.log(`${codec}: ${MediaRecorder.isTypeSupported(codec)}`);
    });
    
    console.log('=== END DEBUG INFO ===');
  };

  // Force create a test recording with minimal data
  const forceCreateTestRecording = () => {
    console.log('Creating test recording with dummy data');
    
    // Create a minimal WebM file header
    const webmHeader = new Uint8Array([
      0x1a, 0x45, 0xdf, 0xa3, // EBML header
      0x9f, 0x42, 0x86, 0x81, 0x01, // DocType: webm
      0x42, 0x82, 0x84, 0x77, 0x65, 0x62, 0x6d // "webm"
    ]);
    
    recordedChunksRef.current = [new Blob([webmHeader], { type: 'video/webm' })];
    setHasRecording(true);
    console.log('Test recording created');
  };

  // Try recording with video only (no audio)
  const tryVideoOnlyRecording = async () => {
    console.log('Trying video-only recording...');
    
    try {
      // Get video-only stream
      const videoOnlyStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: false 
      });
      
      console.log('Video-only stream obtained');
      
      const mediaRecorder = new MediaRecorder(videoOnlyStream, { mimeType: 'video/webm' });
      
      mediaRecorder.ondataavailable = (event) => {
        console.log('Video-only data available, size:', event.data.size);
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        console.log('Video-only recording stopped, chunks:', recordedChunksRef.current.length);
        setHasRecording(recordedChunksRef.current.length > 0);
        videoOnlyStream.getTracks().forEach(track => track.stop());
      };
      
      recordedChunksRef.current = [];
      mediaRecorder.start(100);
      
      // Stop after 3 seconds
      setTimeout(() => {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
      }, 3000);
      
    } catch (error) {
      console.error('Video-only recording failed:', error);
    }
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      ref={containerRef}
      className="fixed top-0 left-0 bg-gray-900 border-4 border-purple-500 rounded-xl shadow-2xl z-50 overflow-hidden"
      style={{ 
        transform: `translate(${position.current.x}px, ${position.current.y}px)`, 
        touchAction: 'none' 
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Header */}
      <div 
        className="h-10 bg-purple-600 flex items-center justify-between px-4 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">🪞 Gương thần</span>
          {isRecording && (
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-300 text-sm font-mono">{formatTime(recordingTime)}</span>
            </div>
          )}
        </div>
        <button 
          onClick={onClose} 
          className="text-white font-bold text-xl hover:text-red-300 transition-colors"
        >
          ×
        </button>
      </div>

      {/* Video */}
      <div className="relative">
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          muted 
          className="w-64 h-48 object-cover" 
          style={{ transform: 'scaleX(-1)' }}
        />
        
        {/* Recording indicator overlay */}
        {isRecording && (
          <div className="absolute top-2 left-2 bg-red-600/80 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            REC
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gray-800 p-3 space-y-2">
        {/* Recording Controls */}
        <div className="flex items-center justify-center gap-2">
          {!isRecordingSupported() ? (
            <div className="bg-gray-600 text-gray-300 px-3 py-1 rounded-lg text-sm font-bold">
              ❌ Không hỗ trợ ghi
            </div>
          ) : !isRecording ? (
            <button
              onClick={startRecording}
              className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!stream}
            >
              <span className="w-2 h-2 bg-white rounded-full"></span>
              Ghi
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors"
            >
              <div className="w-2 h-2 bg-white"></div>
              Dừng
            </button>
          )}
          
          {hasRecording && !isRecording && (
            <>
              <button
                onClick={downloadRecording}
                className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors"
              >
                📥 Tải
              </button>
              <button
                onClick={clearRecording}
                className="bg-orange-600 hover:bg-orange-500 text-white px-3 py-1 rounded-lg text-sm font-bold transition-colors"
              >
                🗑️
              </button>
            </>
          )}
          
          {/* Debug buttons */}
          <button
            onClick={testDownload}
            className="bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded text-xs transition-colors"
            title="Test download functionality"
          >
            🧪 Test
          </button>
          <button
            onClick={debugRecordingState}
            className="bg-purple-600 hover:bg-purple-500 text-white px-2 py-1 rounded text-xs transition-colors"
            title="Debug recording state"
          >
            🐛 Debug
          </button>
          <button
            onClick={forceCreateTestRecording}
            className="bg-yellow-600 hover:bg-yellow-500 text-white px-2 py-1 rounded text-xs transition-colors"
            title="Force create test recording"
          >
            ⚡ Force
          </button>
          <button
            onClick={tryVideoOnlyRecording}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-1 rounded text-xs transition-colors"
            title="Try video-only recording"
          >
            📹 V-Only
          </button>
        </div>

        {/* Status */}
        <div className="text-center text-xs text-gray-400">
          {!isRecordingSupported() && "Trình duyệt không hỗ trợ ghi video"}
          {isRecordingSupported() && isRecording && "Đang ghi video (chỉ hình ảnh)..."}
          {isRecordingSupported() && hasRecording && !isRecording && "Video đã sẵn sàng tải xuống"}
          {isRecordingSupported() && !hasRecording && !isRecording && "Nhấn 'Ghi' để bắt đầu (video-only)"}
        </div>
      </div>
    </div>
  );
};