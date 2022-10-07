// imports
import { useEffect, useState } from "react";
// api
import { getTopTen } from "@api/ranking.api";
// components
import { TextDecoratorSecondary } from "@components/Decorators/CustomText";
import { Col, ListGroup } from "react-bootstrap";
import AnimatedTitle from "@components/AnimatedTitle";
// styles
import style from "./AsideRanking.module.scss";
// types
import { ScoresType } from "types/ranking";
import { Link } from "react-router-dom";

const AsideRanking = () => {
	const [scores, setScores] = useState<ScoresType[]>([]);

	const fetchTopTen = async () => {
		const scores = await getTopTen();
		setScores(scores);
	};
	useEffect(() => {
		fetchTopTen();
		return () => {};
	}, []);

	return (
		<>
			<Col as="aside" lg={3} className={style.rankingWrapper}>
				{/* aside ranking header */}
				<AnimatedTitle />
				{/* list */}
				<ListGroup variant="flush" className={style.participantList}>
					{scores.length > 0 ? (
						scores.map((record, count) => (
							<ListGroup.Item variant="light border-0" className={style.topTenParticipant} key={record.id}>
								<TextDecoratorSecondary>
									<>
										{count + 1}. {record.id}
									</>
								</TextDecoratorSecondary>
							</ListGroup.Item>
						))
					) : (
						<div className={style.noRecords}>
							<TextDecoratorSecondary>
								<h4>No records!</h4>
							</TextDecoratorSecondary>
							<p>
								¿Deseas ser el primero en participar? <Link to="/app">Participa!</Link>
							</p>
						</div>
					)}
				</ListGroup>
			</Col>
		</>
	);
};

export default AsideRanking;
// TODO: CONNECT BBDD
