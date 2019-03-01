import * as React from 'react';

export interface Props {
  name?: string;
  level?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export default class Hello extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
  }


  render() {
    const { name, level = 1, onIncrement, onDecrement } = this.props;

    if (level <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="hello">
        <div className="greeting">
          Hello {name + this.getExclamationMarks(level)}
        </div>
        <div>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrement}>+</button>
        </div>
      </div>
    );
  }
}