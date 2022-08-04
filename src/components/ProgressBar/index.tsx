import './index.scss';

interface IProgressBarProps {
    progress: number;
    size?: number;
    shape: 'round' | 'square';
    trackColor: string;
    indicatorColor: string;
    indicatorWidth: number;
    trackWidth: number;
    children?: React.ReactNode
}

export const ProgressBar: React.FC<IProgressBarProps> = (props) => {

    const {
        progress,
        size = 100,
        shape = 'square',
        trackColor = '#e1e0e0',
        indicatorColor = '#719E6A',
        indicatorWidth = 10,
        trackWidth = 10
    } = props;

    const center = size / 2;
    const radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth);
    const dashArray = 2 * radius * Math.PI;
    const dashOffSet = dashArray * ((100 - progress) / 100);



    return (
        <div className='progress'>
            <svg className='progress-bar'
                style={{ width: size, height: size }}>
                <circle className='progress__track'
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={`${indicatorWidth}px`}
                    fill='transparent'
                />
                <circle className='progress__indicator'
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={indicatorColor}
                    strokeWidth={`${trackWidth}px`}
                    fill='transparent'
                    strokeDasharray={`${dashArray}px`}
                    strokeDashoffset={`${dashOffSet}px`}
                    strokeLinecap={shape} />
            </svg>
            <div className='children'>
                {props.children}
            </div>
        </div>

    )
}
