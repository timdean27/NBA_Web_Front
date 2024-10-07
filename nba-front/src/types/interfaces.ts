// src/types/interfaces.ts

export interface Player {
    player_id: string;
    full_name: string;
    img_src?: string; // Optional if you only need it for HomePage
  }
  
  export interface SeasonStat {
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
  
  export interface Last5GameStat {
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
  