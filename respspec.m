clear all
load ZYT
time = (0:ndat-1)*dt;
figure
subplot(3,1,1)
plot(time, acc), hold on
[pga, ind] = max(abs(acc));
plot(time(ind),acc(ind),'o','MarkerFaceColor','r','MarkerSize',10);
xlabel('Time [s]'), ylabel('Ground Acc. [cm/s^2]'), grid
subplot(3,1,2)
plot(time, vel), hold on
[pgv, ind] = max(abs(vel));
plot(time(ind),vel(ind),'o','MarkerFaceColor','r','MarkerSize',10);
xlabel('Time [s]'), ylabel('Ground Vel. [cm/s]'), grid
subplot(3,1,3)
plot(time, dis), hold on
[pgd, ind] = max(abs(dis));
plot(time(ind),dis(ind),'o','MarkerFaceColor','r','MarkerSize',10);
xlabel('Time [s]'), ylabel('Ground Disp. [cm]'), grid
xsi = 0.05;
Tn = logspace(-2,2,41);
inputmotion = acc;
for n = 1:length(Tn)
    hdur = 5*Tn(n);
    t = (0:dt:hdur);
    omegan = 2*pi/Tn(n);
    omegad = omegan * sqrt(1 - xsi * xsi);
    A = 1/omegad;
    h = A * exp(-xsi * omegan * t) .* sin(omegad * t);
    ur = conv(inputmotion,h) * dt;
    ur = ur(1:ndat);
    SD(n) = max(abs(ur));
    hv = exp(-xsi * omegan * t) .* cos(omegad * t);
    vr = conv(inputmotion, hv) * dt;
    vr = vr(1:ndat) - xsi * omegan * ur;
    SV(n) = max(abs(vr));
    at = -2 * xsi * omegan * vr - omegan^2 * ur;
    SA(n) = max(abs(at));
end
figure
subplot(3,1,1)
loglog(Tn, SD), hold on
xlabel('Period [s]'), ylabel('SD [cm]'), grid
title('Spectral Displacement')
subplot(3,1,2)
loglog(Tn, SV), hold on
xlabel('Period [s]'), ylabel('SV [cm/s]'), grid
title('Spectral Velocity')
subplot(3,1,3)
loglog(Tn, SA), hold on
xlabel('Period [s]'), ylabel('SA [cm/s^2]'), grid
title('Spectral Acceleration')
