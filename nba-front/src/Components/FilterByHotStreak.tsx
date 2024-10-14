import React from 'react';
import { Player, SeasonStat, Last5GameStat } from '../types/interfaces';

interface FilterByHotStreakProps {
  players: Player[]; // Expecting an array of players
  seasonStats: SeasonStat[];
  last5Stats: Last5GameStat[];
}

const FilterByHotStreak: React.FC<FilterByHotStreakProps> = ({ players, seasonStats, last5Stats }) => {

  // Example Hot Streak Logic: A player is on a hot streak if their average points in the last 5 games 
  // is 20% higher than their season average points.
  const hotStreakThreshold = 1.2; // 20% increase

  // Process each player to determine if they are on a hot streak
  const playersWithHotStreakData = players.map((player) => {
    const playerSeasonStats = seasonStats.find(stat => stat.player === player.player_id);
    const playerLast5Stats = last5Stats.filter(stat => stat.player === player.player_id); // Get all last 5 stats for the player

    // Check if both stats exist for the player
    if (!playerSeasonStats || playerLast5Stats.length === 0) {
      return {
        player,
        isOnHotStreak: false,
        last5AveragePoints: null,
        seasonAveragePoints: null
      };
    }

    // Calculate total and average points for the last 5 games
    const totalLast5Points = playerLast5Stats.reduce((sum, game) => sum + game.points, 0);
    const last5AveragePoints = totalLast5Points / playerLast5Stats.length;

    // Calculate season average points
    const seasonAveragePoints = playerSeasonStats.points_per_game

    // Determine if the player is on a hot streak
    const isOnHotStreak = last5AveragePoints > seasonAveragePoints * hotStreakThreshold;

    // Return the player data with the calculated streak information
    return {
      player,
      isOnHotStreak,
      last5AveragePoints,
      seasonAveragePoints
    };
  });

  return (
    <div>
      {playersWithHotStreakData.map(({ player, isOnHotStreak, last5AveragePoints, seasonAveragePoints }) => (
        <div key={player.player_id} className="hot-streak-info">
          {isOnHotStreak ? (
            <>
              <h2>{player.full_name} is on a hot streak! 🔥</h2>
              <p>Last 5 games average points: {last5AveragePoints?.toFixed(2)}</p>
              <p>Season average points: {seasonAveragePoints?.toFixed(2)}</p>
            </>
          ) : (
            <p>{player.full_name} is not on a hot streak currently.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterByHotStreak;
