import { Table } from "antd";
import { User } from '@/app/types'
import { useEffect, useState } from "react";

interface Stage {
    id: number;
    url: string;
    is_klassieker: boolean;
    stage_type: string;
}
const stageColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
    {
      title: 'Klassieker',
      dataIndex: 'is_klassieker',
	  render: (bool: boolean) => <p>{bool? 'TRUE': 'FALSE'}</p>,
    },
    {
      title: 'Stage Type',
      dataIndex: 'stage_type',
    },
];

interface Tour {
    id: number;
    is_klassieker: boolean;
    url: string;
}
const tourColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Klassieker',
      dataIndex: 'is_klassieker',
	  render: (bool: boolean) => <p>{bool? 'TRUE': 'FALSE'}</p>,
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
];

interface Game {
    id: number;
    tour__url: string;
}
const gameColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Tour URL',
      dataIndex: 'tour__url',
    }
];

interface GameTeam {
    id: number;
    auth_user__username: string;
    game__tour__url: string;
}
const gameTeamColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'User',
      dataIndex: 'auth_user__username',
    },
    {
      title: 'Game Tour URL',
      dataIndex: 'game__tour__url',
    },
];

interface Rider {
    id: number;
    full_name: string;
    url: string;
    real_team: string;
}
const riderColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
    },
    {
      title: 'Real Team',
      dataIndex: 'real_team',
    },
];

interface RiderGameTeam {
    id: number;
    game_team__id: number;
    rider__full_name: string;
    status: string;
}
const riderGameTeamColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Game Team Id',
      dataIndex: 'game_team__id',
    },
    {
      title: 'Rider Name',
      dataIndex: 'rider__full_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
];

interface StageTour {
    id: number;
    stage__url: string;
    tour__url: string;
    stage_number: number;
}
const stageTourColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Stage URL',
      dataIndex: 'stage__url',
    },
    {
      title: 'Tour URL',
      dataIndex: 'tour__url',
    },
    {
      title: 'Stage Number',
      dataIndex: 'stage_number',
    },
];


export default function DisplayUsers() {
    const [all, setAll] = useState<any>(null)
    useEffect(() => {getAll().then(res => setAll(res))},[])

    console.log(all)
    return (
        all
        &&
        <div className=" space-y-4">
            <Table title={() => 'Rider'} columns={riderColumn} dataSource={all['riders']} pagination={false} />
            <Table title={() => 'RiderGameTeam'} columns={riderGameTeamColumn} dataSource={all['ridergameteams']} pagination={false} />
            <Table title={() => 'StageTour'} columns={stageTourColumn} dataSource={all['stagetours']} pagination={false} />
            <Table title={() => 'Stage'} columns={stageColumn} dataSource={all['stages']} pagination={false} />
            <Table title={() => 'Game'} columns={gameColumn} dataSource={all['games']} pagination={false} />
            <Table title={() => 'GameTeam'} columns={gameTeamColumn} dataSource={all['gameteams']} pagination={false} />
            <Table title={() => 'Tour'} columns={tourColumn} dataSource={all['tours']} pagination={false} />
        </div>
    )
}





const getAll = async (): Promise<any> => {
    const response = await fetch('/api/alldb');
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
}