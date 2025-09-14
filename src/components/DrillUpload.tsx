import React, { useState } from 'react';
import axios from 'axios';

const DrillUpload = () => {
  const [drillData, setDrillData] = useState({ file: null });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setDrillData((prev) => ({ ...prev, file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!drillData.file) {
      alert('Please select a video file to upload.');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('video', drillData.file);

      const response = await axios.post('http://localhost:3000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 2 * 60 * 1000,
      });

      const data = response.data;

      if (data) {
        setUploadResult(data);
        alert('Upload successful!');
        setDrillData({ file: null });
      } else {
        alert('Upload failed: Analysis unsuccessful');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: Network or server error.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Upload Drill Video</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <div style={{ marginBottom: 15 }}>
          <label htmlFor="videoFile" style={{ display: 'block', marginBottom: 5 }}>
            Video File
          </label>
          <input
            id="videoFile"
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            disabled={isUploading}
            required
            style={{ padding: 5, fontSize: 16 }}
          />
        </div>
        <button
          type="submit"
          disabled={isUploading}
          style={{
            padding: '10px 20px',
            fontSize: 16,
            cursor: isUploading ? 'not-allowed' : 'pointer',
            backgroundColor: isUploading ? '#ccc' : '#007bff',
            border: 'none',
            color: 'white',
            borderRadius: 4,
          }}
        >
          {isUploading ? 'Uploading...' : 'Upload Drill'}
        </button>
      </form>

      {uploadResult && (
        <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 20, backgroundColor: '#f9f9f9' }}>
          <h3>Analysis Result</h3>

          <p><strong>Message:</strong> {uploadResult.message ?? 'N/A'}</p>
          <p><strong>Analysis Status:</strong> {uploadResult.response?.analysis_status ?? 'N/A'}</p>
          <p><strong>Analysis Timestamp:</strong> {uploadResult.response?.analysis_timestamp ?? 'N/A'}</p>
          <p>
            <strong>Download URL:</strong>{' '}
            {uploadResult.response?.download_url ? (
              <a href={uploadResult.response.download_url} target="_blank" rel="noreferrer">
                {uploadResult.response.download_url}
              </a>
            ) : 'N/A'}
          </p>

          <h4>Player Analysis</h4>
          <div style={{ paddingLeft: 20 }}>
            <h5>Comparison to Standards</h5>
            <ul>
              <li>Elite Jump Threshold: {uploadResult.response?.player_analysis?.comparison_to_standards?.elite_jump_threshold ?? 'N/A'}</li>
              <li>Elite Speed Threshold: {uploadResult.response?.player_analysis?.comparison_to_standards?.elite_speed_threshold ?? 'N/A'}</li>
              <li>Player Jump Percentile: {uploadResult.response?.player_analysis?.comparison_to_standards?.player_jump_percentile ?? 'N/A'}</li>
              <li>Player Speed Percentile: {uploadResult.response?.player_analysis?.comparison_to_standards?.player_speed_percentile?.toFixed(2) ?? 'N/A'}</li>
            </ul>

            <h5>Detailed Metrics</h5>
            <h6>Agility Analysis</h6>
            <ul>
              <li>Balance Rating: {uploadResult.response?.player_analysis?.detailed_metrics?.agility_analysis?.balance_rating?.toFixed(2) ?? 'N/A'}</li>
              <li>Body Control Score: {uploadResult.response?.player_analysis?.detailed_metrics?.agility_analysis?.body_control_score?.toFixed(2) ?? 'N/A'}</li>
              <li>Change Direction Speed: {uploadResult.response?.player_analysis?.detailed_metrics?.agility_analysis?.change_direction_speed ?? 'N/A'}</li>
              <li>Coordination Score: {uploadResult.response?.player_analysis?.detailed_metrics?.agility_analysis?.coordination_score?.toFixed(2) ?? 'N/A'}</li>
              <li>Flexibility Rating: {uploadResult.response?.player_analysis?.detailed_metrics?.agility_analysis?.flexibility_rating ?? 'N/A'}</li>
              <li>Reaction Time (ms): {uploadResult.response?.player_analysis?.detailed_metrics?.agility_analysis?.reaction_time_ms ?? 'N/A'}</li>
            </ul>

            <h6>Endurance Analysis</h6>
            <ul>
              <li>Cardiovascular Efficiency: {uploadResult.response?.player_analysis?.detailed_metrics?.endurance_analysis?.cardiovascular_efficiency ?? 'N/A'}</li>
              <li>Consistency Over Time: {uploadResult.response?.player_analysis?.detailed_metrics?.endurance_analysis?.consistency_over_time ?? 'N/A'}</li>
              <li>Fatigue Resistance: {uploadResult.response?.player_analysis?.detailed_metrics?.endurance_analysis?.fatigue_resistance ?? 'N/A'}</li>
              <li>Recovery Rate: {uploadResult.response?.player_analysis?.detailed_metrics?.endurance_analysis?.recovery_rate ?? 'N/A'}</li>
              <li>Stamina Score: {uploadResult.response?.player_analysis?.detailed_metrics?.endurance_analysis?.stamina_score ?? 'N/A'}</li>
            </ul>

            <h6>Jump Analysis</h6>
            <ul>
              <li>Air Time (ms): {uploadResult.response?.player_analysis?.detailed_metrics?.jump_analysis?.air_time_ms ?? 'N/A'}</li>
              <li>Average Jump Height (cm): {uploadResult.response?.player_analysis?.detailed_metrics?.jump_analysis?.average_jump_height_cm ?? 'N/A'}</li>
              <li>Explosive Power Score: {uploadResult.response?.player_analysis?.detailed_metrics?.jump_analysis?.explosive_power_score ?? 'N/A'}</li>
              <li>Jump Frequency: {uploadResult.response?.player_analysis?.detailed_metrics?.jump_analysis?.jump_frequency ?? 'N/A'}</li>
              <li>Landing Stability: {uploadResult.response?.player_analysis?.detailed_metrics?.jump_analysis?.landing_stability ?? 'N/A'}</li>
              <li>Leg Strength Score: {uploadResult.response?.player_analysis?.detailed_metrics?.jump_analysis?.leg_strength_score ?? 'N/A'}</li>
              <li>Max Vertical Jump (cm): {uploadResult.response?.player_analysis?.detailed_metrics?.jump_analysis?.max_vertical_jump_cm ?? 'N/A'}</li>
              <li>Takeoff Technique: {uploadResult.response?.player_analysis?.detailed_metrics?.jump_analysis?.takeoff_technique ?? 'N/A'}</li>
            </ul>

            <h6>Overall Rating</h6>
            <ul>
              <li>Athleticism Score: {uploadResult.response?.player_analysis?.detailed_metrics?.overall_rating?.athleticism_score?.toFixed(1) ?? 'N/A'}</li>
              <li>Coach Recommendation: {uploadResult.response?.player_analysis?.detailed_metrics?.overall_rating?.coach_recommendation ?? 'N/A'}</li>
              <li>Physical Condition: {uploadResult.response?.player_analysis?.detailed_metrics?.overall_rating?.physical_condition?.toFixed(1) ?? 'N/A'}</li>
              <li>Potential Rating: {uploadResult.response?.player_analysis?.detailed_metrics?.overall_rating?.potential_rating?.toFixed(1) ?? 'N/A'}</li>
              <li>Technical Ability: {uploadResult.response?.player_analysis?.detailed_metrics?.overall_rating?.technical_ability?.toFixed(1) ?? 'N/A'}</li>
            </ul>

            <h6>Shooting Analysis</h6>
            <ul>
              <li>Accuracy Rating: {uploadResult.response?.player_analysis?.detailed_metrics?.shooting_analysis?.accuracy_rating ?? 'N/A'}</li>
              <li>Body Positioning Score: {uploadResult.response?.player_analysis?.detailed_metrics?.shooting_analysis?.body_positioning_score?.toFixed(2) ?? 'N/A'}</li>
              <li>Follow Through Quality: {uploadResult.response?.player_analysis?.detailed_metrics?.shooting_analysis?.follow_through_quality?.toFixed(2) ?? 'N/A'}</li>
              <li>Shot Power Score: {uploadResult.response?.player_analysis?.detailed_metrics?.shooting_analysis?.shot_power_score ?? 'N/A'}</li>
              <li>Technique Consistency: {uploadResult.response?.player_analysis?.detailed_metrics?.shooting_analysis?.technique_consistency ?? 'N/A'}</li>
            </ul>

            <h6>Sprint Analysis</h6>
            <ul>
              <li>Acceleration Phases:
                <ul>
                  {(uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.acceleration_phases?.length ?? 0) > 0
                    ? uploadResult.response.player_analysis.detailed_metrics.sprint_analysis.acceleration_phases.map((phase, i) => (
                        <li key={i}>
                          Frame {phase.frame ?? 'N/A'}: Acceleration {phase.acceleration?.toFixed(2) ?? 'N/A'}, Speed {phase.speed?.toFixed(2) ?? 'N/A'}
                        </li>
                      ))
                    : <li>N/A</li>
                  }
                </ul>
              </li>
              <li>Average Speed (km/h): {uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.average_speed_kmh?.toFixed(2) ?? 'N/A'}</li>
              <li>Deceleration Control: {uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.deceleration_control ?? 'N/A'}</li>
              <li>Form Consistency: {uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.form_consistency?.toFixed(2) ?? 'N/A'}</li>
              <li>Max Speed (km/h): {uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.max_speed_kmh?.toFixed(2) ?? 'N/A'}</li>
              <li>Running Efficiency: {uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.running_efficiency ?? 'N/A'}</li>
              <li>Sprint Endurance: {uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.sprint_endurance ?? 'N/A'}</li>
              <li>Stride Frequency: {uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.stride_frequency ?? 'N/A'}</li>
              <li>Stride Length (m): {uploadResult.response?.player_analysis?.detailed_metrics?.sprint_analysis?.stride_length_m ?? 'N/A'}</li>
            </ul>
          </div>

          <h4>Performance Highlights</h4>
          <ul>
            {/* You can safely add items here if data is available */}
            <li>Highest Jump: {uploadResult.response?.performance_highlights?.highest_jump ?? 'N/A'}</li>
            <li>Peak Acceleration: {uploadResult.response?.performance_highlights?.peak_acceleration ?? 'N/A'}</li>
            <li>Sprint Sessions: {uploadResult.response?.performance_highlights?.sprint_sessions ?? 'N/A'}</li>
            <li>Top Speed Achieved: {uploadResult.response?.performance_highlights?.top_speed_achieved ?? 'N/A'}</li>
            <li>Total Jumps Recorded: {uploadResult.response?.performance_highlights?.total_jumps_recorded ?? 'N/A'}</li>
          </ul>

          <h4>Player Performance Summary</h4>
          <ul>
            <li>Areas For Improvement:
              <ul>
                {(uploadResult.response?.player_performance_summary?.areas_for_improvement?.length ?? 0) > 0
                  ? uploadResult.response.player_performance_summary.areas_for_improvement.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))
                  : <li>N/A</li>
                }
              </ul>
            </li>
            <li>Coach Recommendation: {uploadResult.response?.player_performance_summary?.coach_recommendation ?? 'N/A'}</li>
            <li>Key Strengths:
              <ul>
                {(uploadResult.response?.player_performance_summary?.key_strengths?.length ?? 0) > 0
                  ? uploadResult.response.player_performance_summary.key_strengths.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))
                  : <li>N/A</li>
                }
              </ul>
            </li>
            <li>Overall Grade: {uploadResult.response?.player_performance_summary?.overall_grade ?? 'N/A'}</li>
            <li>Overall Score: {uploadResult.response?.player_performance_summary?.overall_score ?? 'N/A'}</li>
          </ul>

          <h4>Technical Analysis</h4>
          <ul>
            <li>Balance Control: {uploadResult.response?.technical_analysis?.balance_control ?? 'N/A'}</li>
            <li>Body Coordination: {uploadResult.response?.technical_analysis?.body_coordination ?? 'N/A'}</li>
            <li>Landing Technique: {uploadResult.response?.technical_analysis?.landing_technique ?? 'N/A'}</li>
            <li>Sprint Form Consistency: {uploadResult.response?.technical_analysis?.sprint_form_consistency ?? 'N/A'}</li>
          </ul>

          <h4>Video Analysis Data</h4>
          <ul>
            <li>Analysis Completion Time: {uploadResult.response?.video_analysis_data?.analysis_completion_time?.toFixed(2) ?? 'N/A'} seconds</li>
            <li>Detection Success Rate: {uploadResult.response?.video_analysis_data?.detection_success_rate ?? 'N/A'}</li>
            <li>Number of Frames Processed: {uploadResult.response?.video_analysis_data?.num_frames_processed ?? 'N/A'}</li>
            <li>Processing Speed (fps): {uploadResult.response?.video_analysis_data?.processing_speed_fps?.toFixed(2) ?? 'N/A'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DrillUpload;
