import React from 'react';

interface Player {
  player_id: string;
  full_name: string;
}

interface SeasonStat {
  assists: number;
  blocks: number;
  defensive_rebounds: number;
  field_goal_percentage: number;
  field_goals_attempted: number;
  field_goals_made: number;
  free_throw_percentage: number;
  free_throws_attempted: number;
  free_throws_made: number;
  games_played: number;
  minutes_per_game: number;
  offensive_rebounds: number;
  personal_fouls: number;
  player: string;
  plus_minus: number;
  points_per_game: number;
  season_year: string;
  steals: number;
  team: string;
  three_point_percentage: number;
  three_points_attempted: number;
  three_points_made: number;
  total_rebounds: number;
  turnovers: number;
}

interface Last5GameStat {
  assists: number;
  blocks: number;
  defensive_rebounds: number;
  field_goal_percentage: number;
  field_goals_attempted: number;
  field_goals_made: number;
  free_throw_percentage: number;
  free_throws_attempted: number;
  free_throws_made: number;
  game_date: string;
  matchup: string;
  minutes: number;
  offensive_rebounds: number;
  personal_fouls: number;
  player: string;
  plus_minus: number;
  points: number;
  steals: number;
  three_point_percentage: number;
  three_points_attempted: number;
  three_points_made: number;
  total_rebounds: number;
  turnovers: number;
  win_loss: string;
}

interface PlayerStatsProps {
  player: Player;
  seasonStats: SeasonStat[];
  last5Stats: Last5GameStat[];
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ player, seasonStats, last5Stats }) => {
  // Find the season stats for the current player
  const playerSeasonStats = seasonStats.find((stat) => stat.player === player.player_id);

  // Find the last 5 games stats for the current player
  const playerLast5GamesStats = last5Stats.filter((game) => game.player === player.player_id);

  return (
    <div className="player-stats">
      {/* Season Stats */}
      {playerSeasonStats ? (
        <div className="season-stats">
          <h3>Season Stats ({playerSeasonStats.season_year})</h3>
          <ul>
            <li>Games Played: {playerSeasonStats.games_played}</li>
            <li>Points Per Game: {playerSeasonStats.points_per_game}</li>
            <li>Assists: {playerSeasonStats.assists}</li>
            <li>Rebounds: {playerSeasonStats.total_rebounds}</li>
            <li>Blocks: {playerSeasonStats.blocks}</li>
            <li>Field Goal Percentage: {playerSeasonStats.field_goal_percentage}%</li>
            <li>Free Throw Percentage: {playerSeasonStats.free_throw_percentage}%</li>
            <li>Three Point Percentage: {playerSeasonStats.three_point_percentage}%</li>
            <li>Minutes Per Game: {playerSeasonStats.minutes_per_game}</li>
            <li>Plus/Minus: {playerSeasonStats.plus_minus}</li>
          </ul>
        </div>
      ) : (
        <p>No season stats available for {player.full_name}.</p>
      )}

      {/* Last 5 Games Stats */}
      <div className="last-5-games">
        <h3>Last 5 Games</h3>
        {playerLast5GamesStats.length > 0 ? (
          <ul>
            {playerLast5GamesStats.map((game, index) => (
              <li key={index}>
                <h4>{game.game_date} - {game.matchup} ({game.win_loss})</h4>
                <ul>
                  <li>Points: {game.points}</li>
                  <li>Assists: {game.assists}</li>
                  <li>Rebounds: {game.total_rebounds}</li>
                  <li>Field Goals Made/Attempted: {game.field_goals_made}/{game.field_goals_attempted}</li>
                  <li>Field Goal Percentage: {game.field_goal_percentage}%</li>
                  <li>Minutes Played: {game.minutes}</li>
                  <li>Plus/Minus: {game.plus_minus}</li>
                  {/* Add more stats as needed */}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No last 5 games stats available for {player.full_name}.</p>
        )}
      </div>
    </div>
  );
};

export default PlayerStats;