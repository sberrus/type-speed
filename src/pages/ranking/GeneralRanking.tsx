// imports
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// components
import AnimatedTitle from "@components/AnimatedTitle";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
// assets
import Wpm from "@assets/gif/Wpm.gif";
import Lps from "@assets/gif/Lps.gif";
import Acc from "@assets/gif/Acc.gif";
// styles
import style from "./GeneralRanking.module.scss";
// types
import { ScoresType } from "types/ranking";
import { getRankingByCategory } from "@api/ranking.api";
import { TextDecoratorPrimary, TextDecoratorSecondary } from "@components/Decorators/CustomText";
import useAuth from "context/useAuth";

const GeneralRanking = () => {
	// hooks
	const auth = useAuth();

	// states
	const [PPMRanking, setPPMRanking] = useState<ScoresType[]>([]);
	const [LPSRanking, setLPSRanking] = useState<ScoresType[]>([]);
	const [ACCRanking, setACCRanking] = useState<ScoresType[]>([]);

	const fetchRankings = async () => {
		let leaders: string[] = [];
		const PPMScore = await getRankingByCategory("words_per_minute");
		const LPSScore = await getRankingByCategory("letters_per_second");
		const ACCScore = await getRankingByCategory("accuracy");

		// get PPM score and leader
		leaders.push(PPMScore[0].id);
		setPPMRanking(() => {
			return PPMScore;
		});

		// filter duplicated leaders
		const LPSRanking = LPSScore.filter((score: ScoresType) => {
			return !leaders.includes(score.id);
		});

		//
		if (!LPSRanking[0]) return;
		leaders.push(LPSRanking[0].id);
		setLPSRanking(() => {
			return LPSRanking;
		});

		// filter duplicated leaders
		const ACCRanking = ACCScore.filter((score: ScoresType) => {
			return !leaders.includes(score.id);
		});

		setACCRanking(() => {
			return ACCRanking;
		});
	};
	useEffect(() => {
		fetchRankings();
		return () => {};
	}, []);

	return (
		<div className={`${style.ranking}`}>
			<Container className={`${style.rankingWrapper}`}>
				{/* user ranking button */}
				{auth?.isLogged() && (
					<div className={style.personalRankingContainer}>
						<Link to="/profile/user-ranking" className={`${style.personalRankingButton}`}>
							<TextDecoratorSecondary>Ver ranking personal</TextDecoratorSecondary>
						</Link>
					</div>
				)}
				{/* title */}
				<AnimatedTitle title="Podio" />
				{/* copy */}
				<h5 className="text-dark text-center">
					<TextDecoratorSecondary>
						<>Region: {auth?.isLogged() ? auth.session?.user.city : "Global"}</>
					</TextDecoratorSecondary>
				</h5>
				<p className="text-dark text-center">
					<TextDecoratorSecondary>
						Gracias por participar en el primer torneo de mecanografia JE
					</TextDecoratorSecondary>
				</p>
				{!auth?.isLogged() && (
					<p className="text-dark text-center">
						Para ver el ranking de su región y su ranking personal, debes <Link to="/auth">iniciar sesión</Link>{" "}
						con tu cuenta
					</p>
				)}
				{/* rankings */}
				<Row>
					{/* Letters Per Second Ranking */}
					<Col as="section" className={style.rankingSection}>
						<div className={style.imgContainer}>
							<img src={Lps} alt="" className={style.img} />
						</div>
						<div className={style.listWrapper}>
							<ListGroup>
								{LPSRanking.map((score, key) => (
									<ListGroup.Item key={score.id}>
										<TextDecoratorSecondary>
											<>
												<div className={style.playerData}>
													<span>
														{key + 1}{" "}
														{key + 1 <= 3 && (
															<>
																<div
																	className={`${style.positionBadgeStart} ${
																		key + 1 === 1 && style.first
																	} ${key + 1 === 2 && style.second} ${key + 1 === 3 && style.third}`}
																></div>
															</>
														)}
														{score.id}
													</span>
													{/* {key + 1 <= 3 && (
														<div className={style.podium}>
															{key + 1}{" "}
															<div
																className={`${style.positionBadge} ${key + 1 === 1 && style.first} ${
																	key + 1 === 2 && style.second
																} ${key + 1 === 3 && style.third}`}
															></div>
														</div>
													)} */}
												</div>{" "}
												<p>
													<span>{Number(score.letters_per_second).toFixed(2)} LPS</span> -{" "}
													<small>{Number(score.words_per_minute).toFixed(2)} PPM</small>
												</p>
											</>
										</TextDecoratorSecondary>
									</ListGroup.Item>
								))}
							</ListGroup>
						</div>
					</Col>
					{/* Words Per Minute Ranking */}
					<Col as="section" className={style.rankingSection}>
						<div className={`${style.imgContainer} align-items-lg-start`}>
							<img src={Wpm} alt="" className={style.img} />
						</div>
						<div className={style.listWrapper}>
							<ListGroup>
								{PPMRanking.map((score, key) => (
									<ListGroup.Item key={score.id}>
										<TextDecoratorSecondary>
											<>
												<div className={style.playerData}>
													<span>
														{key + 1}{" "}
														{key + 1 <= 3 && (
															<>
																<div
																	className={`${style.positionBadgeStart} ${
																		key + 1 === 1 && style.first
																	} ${key + 1 === 2 && style.second} ${key + 1 === 3 && style.third}`}
																></div>
															</>
														)}
														{score.id}
													</span>
													{/* {key + 1 <= 3 && (
														<div className={style.podium}>
															{key + 1}{" "}
															<div
																className={`${style.positionBadge} ${key + 1 === 1 && style.first} ${
																	key + 1 === 2 && style.second
																} ${key + 1 === 3 && style.third}`}
															></div>
														</div>
													)} */}
												</div>{" "}
												<p>
													<span>{Number(score.words_per_minute).toFixed(2)} PPM</span> -{" "}
													<small>{Number(score.letters_per_second).toFixed(2)} LPS</small>
												</p>
											</>
										</TextDecoratorSecondary>
									</ListGroup.Item>
								))}
							</ListGroup>
						</div>
					</Col>
					{/* Accuracy Ranking */}
					<Col as="section" className={style.rankingSection}>
						<div className={style.imgContainer}>
							<img src={Acc} alt="" className={style.img} />
						</div>
						<div className={style.listWrapper}>
							<ListGroup>
								{ACCRanking.map((score, key) => (
									<ListGroup.Item key={score.id}>
										<TextDecoratorSecondary>
											<>
												<div className={style.playerData}>
													<span>
														{key + 1}{" "}
														{key + 1 <= 3 && (
															<>
																<div
																	className={`${style.positionBadgeStart} ${
																		key + 1 === 1 && style.first
																	} ${key + 1 === 2 && style.second} ${key + 1 === 3 && style.third}`}
																></div>
															</>
														)}
														{score.id}
													</span>
												</div>{" "}
												<span>{(score.accuracy * 100).toFixed(2)}%</span> -{" "}
												<small>{Number(score.words_per_minute).toFixed(2)} PPM</small>
											</>
										</TextDecoratorSecondary>
									</ListGroup.Item>
								))}
							</ListGroup>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default GeneralRanking;
