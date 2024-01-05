import { HiOutlinePuzzlePiece } from 'react-icons/hi2';
import MiniCard from '../../ui/MiniCard';
import { usePoints } from '../../hooks/usePoints';
import LoaderMini from '../../ui/LoaderMini';

function PointsCard() {
  const { points, isLoading } = usePoints();

  if (isLoading)
    return (
      <MiniCard>
        <LoaderMini />
      </MiniCard>
    );

  return (
    <MiniCard
      color="green"
      icon={<HiOutlinePuzzlePiece />}
      heading="Points"
      count={points?.at(0)?.points}
    />
  );
}

export default PointsCard;
