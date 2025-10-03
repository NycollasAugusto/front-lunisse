import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Card } from "../components/Card";
import { LoadingSpinner } from "../components/LoadingSpinner";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import {
  AlertTriangle,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
} from "lucide-react";

export const Relatorios = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reportsData, setReportsData] = useState(null);

  useEffect(() => {
    const loadReportsData = async () => {
      try {
        const data = await mockApi.getReportsData(user.id);
        setReportsData(data);
      } catch (error) {
        console.error("Erro ao carregar dados dos relatórios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReportsData();
  }, [user.id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-stone-900 via-stone-800 to-orange-900">
        <LoadingSpinner size="lg" />
      </div>
    );

  if (!reportsData) return <div>Erro ao carregar dados</div>;

  const { stats, frequencyData, riskAlerts } = reportsData;

  const statusData = [
    { name: "Concluídas", value: 40, color: "#7C4A2A" },
    { name: "Pendentes", value: 30, color: "#A0522D" },
    { name: "Canceladas", value: 30, color: "#5C4033" },
  ];

  const patientsData = [
    { name: "Ativos", value: 50, color: "#7C4A2A" },
    { name: "Pendentes", value: 20, color: "#A0522D" },
    { name: "Inativos", value: 30, color: "#5C4033" },
  ];

  const hasNoData = stats.activePatients === 0 && stats.totalSessions === 0;

  // Função para renderizar label central no gráfico doughnut
  const renderCenterLabel = (data) => {
    const total = data.reduce((acc, entry) => acc + entry.value, 0);
    return (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#7C4A2A"
        fontSize={24}
        fontWeight="bold"
      >
        {total}
      </text>
    );
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-orange-700 to-stone-400">
          Relatórios & Analytics
        </h1>
        <p className="text-amber-800 mt-2">
          Insights visuais e métricas em tempo real
        </p>
      </motion.div>

      {hasNoData ? (
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card
            variant="brown"
            className="text-center py-12 border-2 border-dashed border-orange-700/40 backdrop-blur-lg shadow-2xl rounded-3xl"
          >
            <BarChart3 className="w-20 h-20 text-orange-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">Relatórios em Construção</h3>
            <p className="text-amber-800 mt-2">
              Seus relatórios aparecerão aqui conforme você atender pacientes.
            </p>
          </Card>
        </motion.div>
      ) : (
        <>
          {/* KPIs */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            {[
              {
                value: stats.activePatients,
                label: "Pacientes Ativos",
                icon: <Users className="w-7 h-7 text-stone-300" />,
                color: "from-stone-700 to-stone-500",
              },
              {
                value: stats.totalSessions,
                label: "Total de Sessões",
                icon: <Calendar className="w-7 h-7 text-orange-300" />,
                color: "from-orange-800 to-orange-600",
              },
              {
                value: `${stats.attendanceRate}%`,
                label: "Taxa de Conclusão",
                icon: <TrendingUp className="w-7 h-7 text-orange-400" />,
                color: "from-stone-700 to-orange-700",
              },
              {
                value: stats.riskAlerts,
                label: "Alertas de Risco",
                icon: <AlertTriangle className="w-7 h-7 text-red-400" />,
                color: "from-red-800 to-orange-700",
              },
            ].map((kpi, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${kpi.color} text-white`}
              >
                <div className="flex items-center justify-center mb-3">
                  {kpi.icon}
                </div>
                <h3 className="text-4xl font-bold">{kpi.value}</h3>
                <p className="text-sm uppercase tracking-wide mt-1 opacity-80">
                  {kpi.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Frequência - BarChart com gradiente */}
            <Card variant="earthy" className="p-6 rounded-3xl backdrop-blur-lg shadow-xl">
              <h2 className="text-xl text-amber-800 font-semibold mb-4">Frequência</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={frequencyData}>
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A0522D" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7C4A2A" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#444" />
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: "10px",
                      border: "none",
                      color: "white",
                    }}
                  />
                  <Bar
                    dataKey="sessions"
                    fill="url(#colorBar)"
                    radius={[12, 12, 0, 0]}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Status das Sessões - Doughnut */}
            <Card variant="earthy" className="p-6 rounded-3xl backdrop-blur-lg shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-amber-800">Status das Sessões</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    animationDuration={800}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  {renderCenterLabel(statusData)}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: "10px",
                      border: "none",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Pacientes por Status - Doughnut */}
            <Card variant="earthy" className="p-6 rounded-3xl backdrop-blur-lg shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-amber-800">
                Pacientes por Status
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={patientsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    animationDuration={800}
                  >
                    {patientsData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  {renderCenterLabel(patientsData)}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: "10px",
                      border: "none",
                      color: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Alertas de Risco com borda animada */}
            <Card variant="earthy" className="p-6 rounded-3xl backdrop-blur-lg shadow-xl">
              <h2 className="text-xl font-semibold flex items-center gap-2 mb-4 text-amber-800">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Alertas de Risco
              </h2>
              <div className="space-y-3">
                {riskAlerts.length === 0 ? (
                  <p className="text-stone-300 text-center">
                    Nenhum alerta de risco
                  </p>
                ) : (
                  riskAlerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      whileHover={{ scale: 1.02 }}
                      animate={
                        alert.risk === "Alto"
                          ? { boxShadow: "0 0 10px 3px rgba(255,0,0,0.7)" }
                          : {}
                      }
                      transition={{ duration: 0.6, repeat: Infinity, repeatType: "mirror" }}
                      className="flex justify-between items-center p-4 bg-stone-800/60 rounded-xl border-2 border-transparent"
                    >
                      <div>
                        <p className="font-bold">{alert.patient}</p>
                        <p className="text-sm text-stone-400">{alert.reason}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            alert.risk === "Alto"
                              ? "bg-red-500/30 text-red-300"
                              : "bg-orange-500/30 text-orange-300"
                          }`}
                        >
                          {alert.risk}
                        </span>
                        <p className="text-xs text-stone-400 mt-1">
                          {new Date(alert.date).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};
