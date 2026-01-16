export enum ModuleId {
  INTRO = 'intro',
  CONTAINER = 'container',
  ITEMS = 'items',
  ALIGNMENT = 'alignment',
  PROJECT = 'project',
}

export interface ModuleData {
  id: ModuleId;
  title: string;
  description: string;
}

export interface FlexConfig {
  container: {
    display: 'flex' | 'block';
    direction: 'row' | 'row-reverse' | 'column' | 'column-reverse';
    wrap: 'nowrap' | 'wrap';
    justifyContent: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
    alignItems: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    alignContent: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  };
  items: FlexItemConfig[];
}

export interface FlexItemConfig {
  id: number;
  grow: number;
  shrink: number;
  basis: string;
  order?: number;
}

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};
